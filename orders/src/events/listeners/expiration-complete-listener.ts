import {
  ExpirationCompleteEvent,
  Listener,
  OrderStatus,
  Subjects,
} from '@ticcketing/common';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class ExpirationCompleteListener extends Listener<ExpirationCompleteListener> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName = queueGroupName;

  async onMessage(data: ExpirationCompleteEvent['data']) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({
      status: OrderStatus.Cancelled,
      ticket: null,
    });
  }
}
