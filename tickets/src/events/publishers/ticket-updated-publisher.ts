import { Publisher, Subjects, TicketUpdatedEvent } from "@mukesh2530/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
