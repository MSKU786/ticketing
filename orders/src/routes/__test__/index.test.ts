import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';
import { OrderStatus } from '@ticcketing/common';
import { Order } from '../../models/order';

const buildTicket = async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });

  await ticket.save();
  return ticket;
};

it('fetches order for an particular user', async () => {
  // Create three ticket one for user number 1 and 2 for user number 2
  const ticket1 = await buildTicket();

  const ticket2 = await buildTicket();

  const ticket3 = await buildTicket();

  //Create 2 order for user2 and one for user1
  const user1 = global.signin();
  const user2 = global.signin();

  const { body: order1 } = await request(app)
    .post('/api/orders')
    .set('Cookie', user1)
    .send({ ticketId: ticket1.id })
    .expect(201);

  const { body: order2 } = await request(app)
    .post('/api/orders')
    .set('Cookie', user2)
    .send({ ticketId: ticket2.id })
    .expect(201);

  const { body: order3 } = await request(app)
    .post('/api/orders')
    .set('Cookie', user2)
    .send({ ticketId: ticket3.id })
    .expect(201);

  const responseUser2 = await request(app)
    .get('/api/orders')
    .set('Cookie', user2)
    .expect(200);

  expect(responseUser2.body.length).toEqual(2);
  expect(responseUser2.body[0].id).toEqual(order2.id);
  expect(responseUser2.body[1].id).toEqual(order3.id);
  expect(responseUser2.body[0].ticket.id).toEqual(ticket2.id);
  expect(responseUser2.body[1].ticket.id).toEqual(ticket3.id);
});
