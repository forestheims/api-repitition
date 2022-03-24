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
  })
  // READ ONE
  .get('/:id', async (req, res) => {
    const resin = await Resin.getById(req.params.id);
    res.json(resin);
  })
  // UPDATE
  .patch('/:id', async (req, res) => {
    const resin = await Resin.update(req.params.id, req.body);
    res.json(resin);
  })
  // DELETE
  .delete('/:id', async (req, res) => {
    const resin = await Resin.delete(req.params.id);
    res.json(resin);
  });
