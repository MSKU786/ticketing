import { randomBytes } from 'crypto';
import nats, { Message } from 'node-nats-streaming';
console.clear();

// it's same as client
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'https://localhost:4222',
});

stan.on('close', () => {
  console.log('Nats connection closed');
  process.exit();
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('accouting-service');
  const subscription = stan.subscribe(
    'ticket:created',
    'queue-group-name',
    options
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data == 'string') {
      console.log(`Recieved event ${msg.getSequence()}, with data ${data}`);
    }

    msg.ack();
  });
});

//on process interupt
process.on('SIGINT', () => process.exit());

//on process termaination
process.on('SIGTERM', () => process.exit());
