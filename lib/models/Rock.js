const pool = require('../utils/pool');

module.exports = class Rock {
  id;
  name;
  mohsHardness;
  composition;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.mohsHardness = row.mohs_hardness;
    this.composition = row.composition;
  }
  // CREATE
  static async insert({ name, mohsHardness, composition }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        rocks (name, mohs_hardness, composition)
      VALUES
        ($1, $2, $3)
      RETURNING
       *;
    `,
      [name, mohsHardness, composition]
    );
    return new Rock(rows[0]);
  }
  // READ
  static async getAll() {
    const { rows } = await pool.query(`
      SELECT
        *
      FROM
        rocks;
    `);
    return rows.map((row) => new Rock(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        rocks
      WHERE
        id=$1;
    `,
      [id]
    );
    return new Rock(rows[0]);
  }

  // UPDATE
  static async update(id, newRock) {
    const oldRock = await Rock.getById(id);
    const { name, mohsHardness, composition } = { ...oldRock, ...newRock };
    const { rows } = await pool.query(
      `
        UPDATE
          rocks
        SET
          name=$2,
          mohs_hardness=$3,
          composition=$4
        WHERE
          id=$1
        RETURNING
          *;
      `,
      [id, name, mohsHardness, composition]
    );
    return new Rock(rows[0]);
  }

  // DELETE
  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        rocks
      WHERE
        id=$1
      RETURNING
       *;
    `,
      [id]
    );
    return new Rock(rows[0]);
  }
};
