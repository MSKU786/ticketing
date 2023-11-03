import { randomBytes } from 'crypto';
import nats, { Message } from 'node-nats-streaming';
console.clear();

// it's same as client
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'https://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  const subscription = stan.subscribe(
    'ticket:created',
    'order-service-queue-group'
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data == 'string') {
      console.log(`Recieved event ${msg.getSequence()}, with data ${data}`);
    }
  });
});
