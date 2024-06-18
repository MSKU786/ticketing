import { OrderCancelledEvent, OrderStatus } from '@ticcketing/common';
import { Ticket } from '../../../models/ticket';
import { natsWrapper } from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { OrderCancelledListener } from '../order-cancelled-listener';

const setup = async () => {
  //Created a instance on the listener
  const listener = new OrderCancelledListener(natsWrapper.client);
  const orderId = new mongoose.Types.ObjectId().toHexString();
  //create and save a ticket
  const ticket = Ticket.build({
    title: 'Test',
    price: 20,
    userId: 'adfa',
  });

  ticket.set({ orderId });

  await ticket.save();
  //Creat a fake data event

  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, orderId, msg };
};

it('sets the user id of tikcet', async () => {
  const { listener, ticket, data, orderId, msg } = await setup();

  await listener.onMessge(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
