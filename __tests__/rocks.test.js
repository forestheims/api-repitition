const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Rock = require('../lib/models/Rock');

describe('api-repitition routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('adds a row to the rocks table', async () => {
    const expected = {
      name: 'Quartz',
      mohs_hardness: 7,
      composition: 'silica',
    };
    const res = await request(app).post('/api/v1/rocks').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
