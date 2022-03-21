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

  it('inserts a row into the resins table', async () => {
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
    const res = await request(app).post('/api/v1/resins').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
