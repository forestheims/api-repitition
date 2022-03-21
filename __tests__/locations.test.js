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

  it('gets all rows from the locations table', async () => {
    await request(app).post('/api/v1/locations').send(expected);
    const res = await request(app).get('/api/v1/locations');
    expect(res.body).toEqual([{ id: expect.any(String), ...expected }]);
  });

  it('gets a row by id from the locations table', async () => {
    await request(app).post('/api/v1/locations').send(expected);
    const res = await request(app).get('/api/v1/locations/1');
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('updates a row by id from the locations table', async () => {
    await request(app).post('/api/v1/locations').send(expected);
    const res = await request(app)
      .patch('/api/v1/locations/1')
      .send({ x: 44, y: 33 });
    expect(res.body).toEqual({
      id: expect.any(String),
      ...expected,
      x: 44,
      y: 33,
    });
  });

  it('deletes a row by id from the locations table', async () => {
    const aLocation = await request(app)
      .post('/api/v1/locations')
      .send(expected);
    const res = await request(app).delete(`/api/v1/locations/${aLocation.id}`);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
