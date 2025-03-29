import { Publisher, PaymentCreatedEvent, Subjects } from "@mukesh2530/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
