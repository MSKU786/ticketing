import { Listener, Subjects, TicketCreatedEvent } from '@ticcketing/common';
import { Message } from 'node-nats-streaming';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = 'order-service';

  onMessge(data: TicketCreatedEvent['data'], msg: Message): void {}
}
