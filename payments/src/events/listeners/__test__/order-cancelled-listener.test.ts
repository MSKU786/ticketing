import { OrderCancelledEvent, OrderStatus } from '@ticcketing/common';
import { natsWrapper } from '../../../nats-wrapper';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { Order } from '../../../models/order';
import { OrderCancelledListener } from '../order-cancelled-listener';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'adfa',
    price: 234,
  });

  await order.save();
  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: 1,
    ticket: {
      id: 'adfa',
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, order };
};

it('Update the status of order', async () => {
  const { listener, data, msg, order } = await setup();

  await listener.onMessge(data, msg);

  const updateOrder = await Order.findById(order.id);
  expect(updateOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('ack the messge', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessge(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
