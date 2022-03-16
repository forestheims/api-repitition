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
    const expected = { title: '', author_name: '', pages: '' };
    const res = request(app).post('/api/v1/books').send(expected);
    expect(res.body).toEqual(expected);
  });
});
