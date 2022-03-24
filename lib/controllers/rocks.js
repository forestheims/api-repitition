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
  })
  // GET UNIQUE
  .get('/:id', async (req, res) => {
    const rock = await Rock.getById(req.params.id);
    res.json(rock);
  })
  // UPDATE
  .patch('/:id', async (req, res) => {
    const rock = await Rock.update(req.params.id, req.body);
    res.json(rock);
  })
  // DELETE
  .delete('/:id', async (req, res) => {
    const rock = await Rock.delete(req.params.id);
    res.json(rock);
  });
