import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const startDB = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT Key must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('Mongo URL must be define');
  }
  try {
    await natsWrapper.connect('ticketing', 'awerjl', 'http://nats-srv:4222');
    natsWrapper.client.on('close', () => {
      console.log('Nats connection closed');
      process.exit();
    });
    //on process interupt
    process.on('SIGINT', () => natsWrapper.client.close());

    //on process termaination
    process.on('SIGTERM', () => natsWrapper.client.close());
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
  }

  app.listen(4000, () => {
    console.log('listening on port 4000!!!!!');
  });
};

startDB();
