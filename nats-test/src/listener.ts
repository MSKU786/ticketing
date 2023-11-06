import { randomBytes } from 'crypto';
import nats, { Message, Stan } from 'node-nats-streaming';
console.clear();

// it's same as client
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'https://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('Nats connection closed');
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

//on process interupt
process.on('SIGINT', () => process.exit());

//on process termaination
process.on('SIGTERM', () => process.exit());

abstract class Listener {
  private client: Stan;
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessge(data: any, msg: Message): void;
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

class TicketCreatedListener extends Listener {
  subject = 'ticket:created';
  queueGroupName = 'payments-service';

  onMessge(data: any, msg: nats.Message): void {
    console.log('Event Data:', data);
    msg.ack();
  }
}
