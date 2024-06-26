import { OrderCreatedEvent, OrderStatus } from '@ticcketing/common';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-listener';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/order';

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);
  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    expiresAt: '234234',
    status: OrderStatus.Created,
    userId: 'adfa',
    ticket: {
      id: 'adfa',
      price: 234,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('replicated the order info', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessge(data, msg);

  const order = await Order.findById(data.id);
  expect(order!.price).toEqual(data.ticket.price);
});

it('ack the messge', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessge(data, msg);
  expect(msg.ack()).toHaveBeenCalled();
});
