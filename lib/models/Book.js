const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  author_name;
  pages;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.author_name = row.author_name;
    this.pages = row.pages;
  }
  // POST
  static async insert({ title, author_name, pages }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        books (title, author_name, pages)
      VALUES
        ($1, $2, $3)
      RETURNING
        *;
    `,
      [title, author_name, pages]
    );
    return new Book(rows[0]);
  }

  // POST
  static async getAll() {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            books;
        `
    );
    return rows.map((row) => new Book(row));
  }

  // POST
  static async getById(id) {
    const { rows } = await pool.query(
      `
              SELECT
                *
              FROM
                books
              WHERE
                id=$1;
            `,
      [id]
    );
    return new Book(rows[0]);
  }

  // UPDATE
  static async update(id, newBookData) {
    const currentBook = await Book.getById(id);
    const updatedBook = { ...currentBook, ...newBookData };
    const { title, author_name, pages } = updatedBook;
    const { rows } = await pool.query(
      `
        UPDATE
          books
        SET
          title=$2,
          author_name=$3,
          pages=$4
        WHERE
          id=$1
        RETURNING
          *;
    `,
      [id, title, author_name, pages]
    );
    return new Book(rows[0]);
  }

  // POST
  static async delete(id) {
    const { rows } = await pool.query(
      `
              DELETE
                *
              FROM
                books
              WHERE
                id=$1
              RETURNING
                *;
            `,
      [id]
    );
    return new Book(rows[0]);
  }
};
