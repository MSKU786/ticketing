import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

// it's same as client
const stan = nats.connect('ticketing', 'abc', {
  url: 'https://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);

  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: '20',
    });
  } catch (err) {
    console.error(err);
  }
});
