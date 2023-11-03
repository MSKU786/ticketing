import nats from 'node-nats-streaming';
console.clear();

// it's same as client
const stan = nats.connect('ticketing', '123', {
  url: 'https://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  const subscription = stan.subscribe('ticket:created');

  subscription.on('message', (msg) => {
    console.log('Listening to event');
  });
});
