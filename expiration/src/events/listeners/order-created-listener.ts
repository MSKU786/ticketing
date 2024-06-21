import { Listener, Subjects, OrderCreatedEvent } from '@ticcketing/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = queueGroupName;

  async onMessge(data: OrderCreatedEvent['data'], msg: Message) {
    const { title, price, id } = data;
    const ticket = Ticket.build({ id, title, price });
    await ticket.save();
    msg.ack();
  }
}
