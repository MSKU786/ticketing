import nats from 'node-nats-streaming';

// it's same as client
const stan = nats.connect('ticketing', 'abc', {
  url: 'https://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS');

  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: '20',
  });

  stan.publish('ticket:created', data, () => {
    console.log('Event Published');
  });
});
