import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import mongoose from 'mongoose';

it('return a 404 if the ticket if ticket not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const res = await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'hey',
      price: '123',
    })
    .expect(404);
});

it('return a 401 if the ticket .is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const res = await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'hey',
      price: '123',
    })
    .expect(401);
});

it('return a 401 if the ticket  not found', async () => {
  const ticket = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'hey',
      price: '123',
    })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${ticket.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'hey',
      price: '123',
    })
    .expect(401);
});
