import Queue from 'bull';

interface Payload {
  orderId: string;
}
const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  console.log('i want to add some delay over here');
});

export { expirationQueue };
