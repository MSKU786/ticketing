import { randomBytes } from 'crypto';
import nats, { Message, Stan } from 'node-nats-streaming';
import { TicketCreatedListener } from './events/ticket-created-listener';
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
