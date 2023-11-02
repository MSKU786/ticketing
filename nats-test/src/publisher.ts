import nats from 'node-nats-streaming';

// it's same as client
const stan = nats.connect('ticketing', 'abc', {
  url: 'https://localhost:4222',
});

stan.on('connect', () => {
  console.log('Publisher connected to NATS');
});
