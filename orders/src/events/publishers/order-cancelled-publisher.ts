import { Subjects, Publisher, OrderCancelledEvent } from "@mukesh2530/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
