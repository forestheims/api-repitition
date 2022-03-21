const pool = require('../utils/pool');

module.exports = class Resin {
  id;
  name;
  sourceTaxonomy;
  predominantChemicals;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.sourceTaxonomy = row.source_taxonomy;
    this.predominantChemicals = row.predominant_chemicals;
  }

  static async insert({ name, sourceTaxonomy, predominantChemicals }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          resins (name, source_taxonomy, predominant_chemicals)
        VALUES
          ($1, $2, $3)
        RETURNING
          *;
      `,
      [name, sourceTaxonomy, predominantChemicals]
    );
    return new Resin(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          resins;
      `
    );
    return rows.map((row) => new Resin(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT 
          *
        FROM
          resins
        WHERE
          id=$1;
      `,
      [id]
    );
    return new Resin(rows[0]);
  }

  static async update(id, newResin) {
    const oldResin = await Resin.getById(id);
    const { name, sourceTaxonomy, predominantChemicals } = {
      ...oldResin,
      ...newResin,
    };
    const { rows } = await pool.query(
      `
        UPDATE 
          resins
        SET
          name=$2,
          source_taxonomy=$3,
          predominant_chemicals=$4
        WHERE
          id=$1
        RETURNING
          *;
      `,
      [id, name, sourceTaxonomy, predominantChemicals]
    );
    return new Resin(rows[0]);
  }
};
