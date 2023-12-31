import request from 'supertest';
import { app } from '../../app';

it('Clear the cookie once sign out', async () => {
  await request(app)
    .post('/api/user/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const res = await request(app).post('/api/user/signout').send({}).expect(200);

  expect(res.get('Set-Cookie')[0]).toEqual(
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
