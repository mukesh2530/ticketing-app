import {
  Subjects,
  ExpirationCompleteEvent,
  Publisher,
} from "@mukesh2530/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
