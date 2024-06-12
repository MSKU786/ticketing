import { OrderCreatedEvent, OrderStatus } from '@ticcketing/common';
import { Ticket } from '../../../models/ticket';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-listener';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  //Created a instance on the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  //create and save a ticket
  const ticket = Ticket.build({
    title: 'Test',
    price: 20,
    userId: 'adfa',
  });

  //Creat a fake data event

  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: 'adsfadf',
    status: OrderStatus.Created,
    expiresAt: 'adfad',
    version: 0,
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn();
  };


  return {listener, ticket, data, msg};
};
