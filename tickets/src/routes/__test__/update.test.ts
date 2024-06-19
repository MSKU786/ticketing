import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import mongoose from 'mongoose';
import { natsWrapper } from '../../nats-wrapper';

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

it('return a 400 if the invalid parameter passed', async () => {
  const cookie = global.signin();
  const ticket = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'hey',
      price: 12,
    });

  await request(app)
    .put(`/api/tickets/${ticket.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'hey',
      price: -1,
    })
    .expect(500);

  await request(app)
    .put(`/api/tickets/${ticket.body.id}`)
    .set('Cookie', cookie)
    .send({
      price: 20,
    })
    .expect(500);
});

it('return a 200 if the invalid parameter passed', async () => {
  const cookie = global.signin();
  const ticket = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'hey',
      price: 12,
    });

  const updatedTicket = await request(app)
    .put(`/api/tickets/${ticket.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'updated',
      price: 10,
    })
    .expect(200);

  expect(updatedTicket.body.title).toEqual('updated');
  expect(updatedTicket.body.price).toEqual(10);
});

it('after updating publish function has been invoked', async () => {
  const cookie = global.signin();
  const ticket = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'hey',
      price: 12,
    });

  const updatedTicket = await request(app)
    .put(`/api/tickets/${ticket.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'updated',
      price: 10,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('after updating publish function has been invoked', async () => {
  const cookie = global.signin();
  const ticket = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'hey',
      price: 12,
    });

  const updatedTicket = await request(app)
    .put(`/api/tickets/${ticket.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'updated',
      price: 10,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('rejects update if ticket is reserved', async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'hey',
      price: 12,
    });

  const ticket = await Ticket.findById(response.body.id);
  ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() });
  await ticket!.save();

  const updatedTicket = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'updated',
      price: 10,
    })
    .expect(400);
});
