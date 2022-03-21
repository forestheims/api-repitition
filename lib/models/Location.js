const pool = require('../utils/pool');

module.exports = class Location {
  id;
  x;
  y;
  z;

  constructor(row) {
    this.id = row.id;
    this.x = row.x;
    this.y = row.y;
    this.z = row.z;
  }

  static async insert({ x, y, z }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          locations (x, y, z)
        VALUES
          ($1, $2, $3)
        RETURNING
          *;
      `,
      [x, y, z]
    );
    return new Location(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          locations;
      `
    );
    return rows.map((row) => new Location(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          locations
        WHERE
          id=$1;
      `,
      [id]
    );
    return new Location(rows[0]);
  }

  static async update(id, newLocation) {
    const oldLocation = await Location.getById(id);
    const { x, y, z } = { ...oldLocation, ...newLocation };
    const { rows } = await pool.query(
      `
        UPDATE
          locations
        SET
          x=$2,
          y=$3,
          z=$4
        WHERE
          id=$1
        RETURNING
          *;
      `,
      [id, x, y, z]
    );
    return new Location(rows[0]);
  }
};
