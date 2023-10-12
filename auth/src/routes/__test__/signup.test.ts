import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/user/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('returns a 500 on envalid email signup', async () => {
  return request(app)
    .post('/api/user/signup')
    .send({
      email: 'testtest.com',
      password: 'password',
    })
    .expect(500);
});

it('returns a 500 on invalid parameter', async () => {
  return request(app)
    .post('/api/user/signup')
    .send({
      password: 'password',
    })
    .expect(500);
});

it('Disallow duplicate emails a 500 on invalid parameter', async () => {
  await request(app)
    .post('/api/user/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/user/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after on successful signup', async () => {
  const res = await request(app)
    .post('/api/user/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  expect(res.get('Set-Cookie')).toBeDefined();
});
