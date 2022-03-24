const { Router } = require('express');
const User = require('../models/User');

module.exports = Router()
  // POST
  .post('/', async (req, res) => {
    const user = await User.insert(req.body);
    res.json(user);
  })
  // GET ALL
  .get('/', async (req, res) => {
    const users = await User.getAll();
    res.json(users);
  })
  // GET UNIQUE
  .get('/:id', async (req, res) => {
    const user = await User.getById(req.params.id);
    res.json(user);
  })
  // UPDATE
  .patch('/:id', async (req, res) => {
    const user = await User.update(req.params.id, req.body);
    res.json(user);
  })
  // DELETE
  .delete('/:id', async (req, res) => {
    const user = await User.delete(req.params.id);
    res.json(user);
  });
