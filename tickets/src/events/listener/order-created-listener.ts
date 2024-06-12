import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from '@ticcketing/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessge(data: OrderCreatedEvent['data'], msg: Message): void {
    // find the ticket order is reserving
    const ticket = await Ticket.findById(data.ticket.id);

    // if no ticket throw errro
    if (!ticket) throw new Error('Ticket not found');

    // mark the ticket as being reserved by setting up the orderId property
    ticket.set({ orderId: data.id });

    // Save the ticket
    await ticket.save();

    // ack the message
    msg.ack();
  }
}
