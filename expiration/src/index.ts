import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
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

    //intializing the Ordercreatedlistener
    new OrderCreatedListener(natsWrapper.client).listen();
  } catch (err) {
    console.error(err);
  }
};

start();
