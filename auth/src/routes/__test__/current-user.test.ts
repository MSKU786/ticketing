import request from 'supertest';
import { app } from '../../app';

it('Curernt User sign in', async () => {
  const authRes = await request(app)
    .post('/api/user/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const cookie = authRes.get('Set-Cookie');

  console.log(cookie);
  const res = await request(app)
    .get('/api/user/currentUser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser.email).toEqual('test@test.com');
});
