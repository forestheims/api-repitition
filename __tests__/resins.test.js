const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Resin = require('../lib/models/Resin');

describe('api-repitition routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  const expected = {
    name: 'Frankincense',
    sourceTaxonomy: 'Boswellia sacra',
    predominantChemicals: [
      'acid resin',
      'gum',
      'alpha-boswellic acid',
      'phellandrene',
    ],
  };
  const expectedBackwords = {
    name: 'Esnecniknarf',
    sourceTaxonomy: 'Arcas aillewsob',
    predominantChemicals: [
      'Nisen dica',
      'mug',
      'Dica cillewsob-ahpla',
      'enerddnallehp',
    ],
  };

  it('inserts a row into the resins table', async () => {
    const res = await request(app).post('/api/v1/resins').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('returns all rows from the resins table', async () => {
    await request(app).post('/api/v1/resins').send(expected);
    await request(app).post('/api/v1/resins').send(expectedBackwords);
    const res = await request(app).get('/api/v1/resins');
    expect(res.body).toEqual([
      { id: expect.any(String), ...expected },
      { id: expect.any(String), ...expectedBackwords },
    ]);
  });
});
