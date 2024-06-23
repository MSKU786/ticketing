import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@ticcketing/common';

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
