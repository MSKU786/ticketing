import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming';
('node-nats-streaming');

export class TicketCreatedListener extends Listener {
  subject = 'ticket:created';
  queueGroupName = 'payments-service';

  onMessge(data: any, msg: Message) {
    console.log('Event Data:', data);
    msg.ack();
  }
}
