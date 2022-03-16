const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('api-repitition routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('adds a row to the books table', async () => {
    const expected = { title: 'Meow', author_name: 'A Cat', pages: 3 };
    const res = await request(app).post('/api/v1/books').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets all rows from the books table', async () => {
    const expected = { title: 'Meow', author_name: 'A Cat', pages: 3 };
    await request(app).post('/api/v1/books').send(expected);
    const res = await request(app).get('/api/v1/books');
    expect(res.body).toEqual([{ id: expect.any(String), ...expected }]);
  });
});
