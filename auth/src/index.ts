import mongoose from 'mongoose';
import { app } from './app';

const startDB = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT Key must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('Mongo URI must be defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  } catch (err) {
    console.error(err);
  }

  app.listen(4000, () => {
    console.log('listening on port 4000!!!!!');
  });
};

startDB();
