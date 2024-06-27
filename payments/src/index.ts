import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';

const startDB = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT Key must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('Mongo URL must be define');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS cliend ID must be define');
  }

  if (!process.env.NATS_URL) {
    throw new Error('NATS URL must be define');
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS CLUSTER ID must be define');
  }
  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
      console.log('Nats connection closed');
      process.exit();
    });

    //on process interupt
    process.on('SIGINT', () => natsWrapper.client.close());

    //on process termaination
    process.on('SIGTERM', () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
  }

  app.listen(5000, () => {
    console.log('listening on port 5000!!!!!');
  });
};

startDB();
