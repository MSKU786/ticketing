import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from '@ticcketing/common';
import { queueGroupName } from './queue-group-name';
import { Message } from 'node-nats-streaming';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessge(data: OrderCreatedEvent['data'], msg: Message): void {}
}
