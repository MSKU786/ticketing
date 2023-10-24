import request from 'supertest';
import { app } from '../../app';

it('has a route handler listening to /api/tickets for post request', async () => {
  const res = await request(app).post('/api/tickets').send({});

  expect(res.status).not.toEqual(404);
});

it('can only be accessed iuf user signed in', async () => {
  await request(app).post('/api/tickets').send({}).expect(401);
});

it('Not return 401 if user signed in', async () => {
  const res = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({});
  expect(res.status).not.toEqual(401);
});

it('return an error if an invalid title is provided', async () => {});
it('return an error if an invalid price is provided', async () => {});
it('creates a ticket with valid input', async () => {});
