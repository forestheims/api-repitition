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
};
