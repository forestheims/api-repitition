const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');

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

  it('gets a book by id', async () => {
    const expected = { id: '1', title: 'Meow', author_name: 'A Cat', pages: 3 };
    await request(app).post('/api/v1/books').send(expected);
    const res = await request(app).get('/api/v1/books/1');
    expect(res.body).toEqual(expected);
  });

  it('updates a book by id', async () => {
    const expected = { title: 'Meow', author_name: 'A Cat', pages: 3 };
    await request(app).post('/api/v1/books').send(expected);
    const res = await request(app)
      .patch('/api/v1/books/1')
      .send({ author_name: 'A Happy Cat' });
    expect(res.body).toEqual({
      id: '1',
      ...expected,
      author_name: 'A Happy Cat',
    });
  });

  it('deletes a book by id', async () => {
    const aBook = {
      title: 'Meow',
      author_name: 'A Cat',
      pages: 3,
    };
    await request(app).post('/api/v1/books').send(aBook);
    const expected = await Book.getById(1);
    const res = await request(app).delete(`/api/v1/books/${expected.id}`);
    expect(res.body).toEqual(expected);
  });
});
