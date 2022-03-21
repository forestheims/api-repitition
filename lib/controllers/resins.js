const { Router } = require('express');
const Resin = require('../models/Resin');

module.exports = Router()
  // CREATE
  .post('/', async (req, res) => {
    const resin = await Resin.insert(req.body);
    res.json(resin);
  })
  // READ ALL
  .get('/', async (req, res) => {
    const resins = await Resin.getAll();
    res.json(resins);
  });
