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
      mohsHardness: 7,
      composition: 'silica',
    };
    const res = await request(app).post('/api/v1/rocks').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets all rows from the rocks table', async () => {
    const expected = {
      name: 'Quartz',
      mohsHardness: 7,
      composition: 'silica',
    };
    await Rock.insert(expected);
    const res = await request(app).get('/api/v1/rocks');
    expect(res.body).toEqual([{ id: expect.any(String), ...expected }]);
  });

  it('gets a row by id from the rocks table', async () => {
    const expected = {
      name: 'Quartz',
      mohsHardness: 7,
      composition: 'silica',
    };
    await Rock.insert(expected);
    const res = await request(app).get('/api/v1/rocks/1');
    expect(res.body).toEqual({ id: '1', ...expected });
  });

  it('updates a row by id on the rocks table', async () => {
    const expected = {
      name: 'Quartz',
      mohsHardness: 7,
      composition: 'silica',
    };
    await request(app).post('/api/v1/rocks').send(expected);
    const res = await request(app)
      .patch('/api/v1/rocks/1')
      .send({ composition: 'silicon dioxide' });
    expect(res.body).toEqual({
      id: '1',
      ...expected,
      composition: 'silicon dioxide',
    });
  });

  it('deletes a row by id from the rocks table', async () => {
    const aRock = {
      name: 'Quartz',
      mohsHardness: 7,
      composition: 'silica',
    };
    await request(app).post('/api/v1/rocks').send(aRock);
    const expected = await Rock.getById(1);
    const res = await request(app).delete(`/api/v1/rocks/${expected.id}`);
    expect(res.body).toEqual(expected);
  });
});
