import { OrderCreatedEvent, Publisher, Subjects } from '@ticcketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
