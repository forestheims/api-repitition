const { Router } = require('express');
const Rock = require('../models/Rock');

module.exports = Router()
  // POST
  .post('/', async (req, res) => {
    const rock = await Rock.insert(req.body);
    res.json(rock);
  });

// GET ALL

// GET UNIQUE

// UPDATE

// UPDATE
