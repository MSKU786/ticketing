import request from 'supertest';
import { app } from '../../app';

it('User not found in DB', async () => {
  return request(app)
    .post('/api/user/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('500 error when wrong password supplied', async () => {
  await request(app)
    .post('/api/user/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/user/signin')
    .send({
      email: 'test@test.com',
      password: 'asdfadsfasd',
    })
    .expect(400);
});

it('Respond with cookie when valid credential', async () => {
  await request(app)
    .post('/api/user/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const res = await request(app)
    .post('/api/user/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);

  expect(res.get('Set-Cookie')).toBeDefined();
});
