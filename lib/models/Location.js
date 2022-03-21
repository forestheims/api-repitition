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
};
