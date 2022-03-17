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

  // UPDATE

  // DELETE
};
