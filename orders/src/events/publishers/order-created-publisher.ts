import { Publisher, OrderCreatedEvent, Subjects } from "@mukesh2530/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
