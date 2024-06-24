import mongoose from 'mongoose';
import { Ticket } from '../../../models/ticket';
import { natsWrapper } from '../../../nats-wrapper';
import { ExpirationCompleteListener } from '../expiration-complete-listener';
import { Order } from '../../../models/order';
import { ExpirationCompleteEvent, OrderStatus } from '@ticcketing/common';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);
  const ticket = Ticket.build({
    title: 'expiration',
    price: 29,
    id: new mongoose.Types.ObjectId().toHexString(),
  });

  await ticket.save();

  const order = Order.build({
    status: OrderStatus.Created,
    userId: 'adfa',
    expiresAt: new Date(),
    ticket,
  });

  await order.save();

  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, order, data, msg };
};

it('updates the order status to cancelled', async () => {
  const { listener, ticket, order, data, msg } = await setup();

  await listener.onMessge(data, msg);

  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('Emit an order cancelled event', async () => {
  const { listener, ticket, order, data, msg } = await setup();
  await listener.onMessge(data, msg);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
  const eventData = (natsWrapper.client.publish as jest.Mock).mock.calls[0][1];
  console.log('00000');
  console.log(eventData);
  expect(eventData.id).toEqual(order.id);
});

it('ack the message', async () => {
  const { listener, ticket, order, data, msg } = await setup();
  await listener.onMessge(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
