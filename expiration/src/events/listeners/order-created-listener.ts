import { Listener, Subjects, OrderCreatedEvent } from '@ticcketing/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { expirationQueue } from '../../queues/expiration-queue';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessge(data: OrderCreatedEvent['data'], msg: Message) {
    const expiresAt = new String(data.expiresAt).toString();
    const delay = new Date(expiresAt).getTime() - new Date().getTime();

    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay: 10000,
      }
    );
    console.log('i wnat ot add some deelay over here', delay);

    msg.ack();
  }
}
