const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Location = require('../lib/models/Location');

describe('api-repitition routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const expected = {
    x: 628,
    y: 382,
    z: 43,
  };

  it('inserts a row into the locations table', async () => {
    const res = await request(app).post('/api/v1/locations').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
