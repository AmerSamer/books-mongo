const express = require('express');
const booksController = require('../controllers/books.controller')
const router = express.Router();


router.get('/', (req, res) => {
    booksController.getAllBooks(req, res);
}).post('/', (req, res) => {
    booksController.addNewBook(req, res);
}).delete('/:id', (req, res) => {
    booksController.deleteBook(req, res);
}).get('/:year', (req, res) => {
    booksController.getAllBooksByYear(req, res);
}).put('/:id', (req, res) => {
    booksController.updateBook(req, res);
})

module.exports = router;