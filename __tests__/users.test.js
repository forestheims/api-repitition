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
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
