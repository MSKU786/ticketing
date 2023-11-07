import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming';
import { TicketCreatedEvent } from './ticket-created-events';
import { Subjects } from './subject';
('node-nats-streaming');

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payments-service';

  onMessge(data: any, msg: Message) {
    console.log('Event Data:', data);
    msg.ack();
  }
}
