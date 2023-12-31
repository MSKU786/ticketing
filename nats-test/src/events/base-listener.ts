import { Stan, Message } from 'node-nats-streaming';
import { Subjects } from './subject';

interface Event {
  subject: Subjects;
  data: any;
}
export abstract class Listener<T extends Event> {
  private client: Stan;
  abstract subject: T['subject'];
  abstract queueGroupName: string;
  abstract onMessge(data: T['data'], msg: Message): void;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(
        `Message recieved: ${this.subject} from ${this.queueGroupName}`
      );

      const parseData = this.parseMessage(msg);
      this.onMessge(parseData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}
