const pool = require('../utils/pool');

module.exports = class User {
  userId;
  username;
  firstName;
  lastName;
  email;
  password;

  constructor(row) {
    this.userId = row.user_id;
    this.username = row.username;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
    this.email = row.email;
    this.password = row.password;
  }

  static async insert({ username, firstName, lastName, email, password }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          users (username, first_name, last_name, email, password)
        VALUES
          ($1, $2, $3, $4, $5)
        RETURNING
          *;
      `,
      [username, firstName, lastName, email, password]
    );
    return new User(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          users;
      `
    );
    return rows.map((row) => new User(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT 
          *
        FROM
          users
        WHERE
          user_id=$1;
      `,
      [id]
    );
    return new User(rows[0]);
  }

  static async update(id, newUser) {
    const oldUser = await User.getById(id);
    const { username, firstName, lastName, email, password } = {
      ...oldUser,
      ...newUser,
    };
    const { rows } = await pool.query(
      `
        UPDATE 
          users
        SET
          username=$2,
          first_name=$3,
          last_name=$4,
          email=$5,
          password=$6
        WHERE
          user_id=$1
        RETURNING
          *;
      `,
      [id, username, firstName, lastName, email, password]
    );
    return new User(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
          users
        WHERE
          user_id=$1
        RETURNING
          *;
      `,
      [id]
    );
    return new User(rows[0]);
  }
};
