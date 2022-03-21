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

  // static async insert({ name, sourceTaxonomy, predominantChemicals }) {
  //   const { rows } = pool.query(`
  //       INSERT INTO
  //         resins (name, source_taxonomy, predominant_chemical)
  //     `);
  // }
};
