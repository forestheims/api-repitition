const { Router } = require('express');
const Location = require('../models/Location');

module.exports = Router()
  // CREATE
  .post('/', async (req, res) => {
    const location = await Location.insert(req.body);
    res.json(location);
  });
