const { Router } = require('express');
const Rock = require('../models/Rock');

module.exports = Router()
  // POST
  .post('/', async (req, res) => {
    const rock = await Rock.insert(req.body);
    res.json(rock);
  })
  // GET ALL
  .get('/', async (req, res) => {
    const rocks = await Rock.getAll();
    res.json(rocks);
  });

// GET UNIQUE

// UPDATE

// UPDATE
