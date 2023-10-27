import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import mongoose from 'mongoose';

it('return a 404 if the ticket .is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const res = await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it('returns 200 if the ticket search is successfull', async () => {
  const ticket = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'hey',
      price: '123',
    })
    .expect(201);

  await request(app).get(`/api/tickets/${ticket.body.id}`).send().expect(200);
});
