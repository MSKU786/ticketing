import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

let mongo: any;

declare global {
  var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper');

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfgh';
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object {jwt: 'MY_JWT'}
  const session = {
    jwt: token,
  };

  // Turn the sesion into json
  const sessionJSON = JSON.stringify(session);

  //Take json and encode it as base64

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`];
};
