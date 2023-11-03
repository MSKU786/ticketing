import mongoose from 'mongoose';
import { app } from './app';

const startDB = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT Key must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('Mongo URL must be define');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.error(err);
  }

  app.listen(4000, () => {
    console.log('listening on port 4000!!!!!');
  });
};

startDB();