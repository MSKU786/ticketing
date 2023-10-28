import request from 'supertest';
import { app } from '../../app';

const createTicket = () => {
  const ticket = request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'hey',
      price: '123',
    });
  return ticket;
};
it('returns 200 if the ticket search is successfull', async () => {
  await createTicket();
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get(`/api/tickets`).send().expect(200);

  expect(response.body.length).toEqual(4);
});
