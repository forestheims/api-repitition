const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  // POST
  .post('/', async (req, res) => {
    const book = await Book.insert(req.body);
    res.json(book);
  })
  // GET ALL
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  })
  // GET UNIQUE
  .get('/:id', async (req, res) => {
    const book = await Book.getById(req.params.id);
    res.json(book);
  });
