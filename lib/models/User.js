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
};
