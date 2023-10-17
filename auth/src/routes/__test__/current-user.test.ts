import request from 'supertest';
import { app } from '../../app';

it('Curernt User sign in', async () => {
  const cookie = await global.signin();

  const res = await request(app)
    .get('/api/user/currentUser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser.email).toEqual('test@test.com');
});
