import { TicketUpdatedEvent } from '@ticcketing/common';
import { natsWrapper } from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../../models/ticket';
import { TicketUpdatedListener } from '../ticket-updated-listener';

const setup = async () => {
  // creates an instance of listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  //Create and saves a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 100,
  });

  await ticket.save();

  // creates a fake data event
  const data: TicketUpdatedEvent['data'] = {
    version: ticket.version + 1,
    id: ticket.id,
    title: 'new concert',
    price: 109,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // creates a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, ticket };
};

it('finds, update and saves a ticket', async () => {
  const { listener, data, msg, ticket } = await setup();

  // calls the onMessage function with the data object + message object
  await listener.onMessge(data, msg);

  // write assertion to make sure a data is created
  const updatedTicket = await Ticket.findById(data.id);

  expect(updatedTicket).toBeDefined();
  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  // calls the onMessage function with the data object + message object
  await listener.onMessge(data, msg);

  // write a function to make sure assr is called
  expect(msg.ack).toHaveBeenCalled();
});
