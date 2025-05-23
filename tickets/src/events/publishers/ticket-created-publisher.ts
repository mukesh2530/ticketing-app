import { Publisher, Subjects, TicketCreatedEvent } from "@mukesh2530/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
