import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.use(errorHandler);

app.all('*', async () => {
  throw new NotFoundError();
});

const startDB = async () => {
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
