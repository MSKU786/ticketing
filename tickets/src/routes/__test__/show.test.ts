import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('return a 404 if the ticket .is not found', async () => {
  const res = await request(app)
    .get('/api/tickets/falsdkjfkajad')
    .send()
    .expect(404);

  console.log(res.body);
});
