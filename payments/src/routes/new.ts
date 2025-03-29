import express, { Request, Response } from "express";
import {
  requireAuth,
  BadRequestError,
  NotFoundError,
  validateRequest,
  NotAuthorizedError,
  OrderStatus,
} from "@mukesh2530/common";
import { body } from "express-validator";

import { Order } from "../models/order";
import { stripe } from "../../src/stripe";
import { Payment } from "../models/payments";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { natsWrapper } from "../nats-wrapper";
const router = express.Router();

router.post(
  "/api/payments",
  requireAuth as any,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  validateRequest as any,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("You can not pay for cancelled order");
    }
    console.log("token and orderId", token, orderId);
    const charge = await stripe.charges.create({
      currency: "usd",
      amount: order.price * 100,
      source: token,
    });

    const payment = Payment.build({
      orderId,
      stripeId: charge.id,
    });
    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });
    res.status(201).send({ id: payment.id });
  }
);

export { router as createChargeRouter };
