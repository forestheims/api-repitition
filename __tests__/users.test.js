const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

describe('api-repitition routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const expected = {
    username: 'si02',
    firstName: 'Quartz',
    lastName: 'Silica',
    email: 'sillysilicate@si02.com',
    password: 't3tr@h3DRul',
  };

  it('adds a row to the users table', async () => {
    const res = await request(app).post('/api/v1/users').send(expected);
    expect(res.body).toEqual({ userId: expect.any(String), ...expected });
  });

  it('gets all rows from the users table', async () => {
    await request(app).post('/api/v1/users').send(expected);
    const res = await request(app).get('/api/v1/users');
    expect(res.body).toEqual([{ userId: expect.any(String), ...expected }]);
  });

  it('gets a row by id from the users table', async () => {
    await request(app).post('/api/v1/users').send(expected);
    const res = await request(app).get('/api/v1/users/1');
    expect(res.body).toEqual({ userId: '1', ...expected });
  });

  it('updates a row by id on the users table', async () => {
    await request(app).post('/api/v1/users').send(expected);
    const res = await request(app)
      .patch('/api/v1/users/1')
      .send({ username: 'silicon dioxide' });
    expect(res.body).toEqual({
      userId: '1',
      ...expected,
      username: 'silicon dioxide',
    });
  });

  it('deletes a row by id from the users table', async () => {
    await request(app).post('/api/v1/users').send(expected);
    const getById = await User.getById(1);
    const res = await request(app).delete(`/api/v1/users/${getById.userId}`);
    expect(res.body).toEqual({ userId: expect.any(String), ...expected });
  });
});
