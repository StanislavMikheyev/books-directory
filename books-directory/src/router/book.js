'use strict';

const express = require('express');
const router = express.Router();

const BookController = require('../controller/BookController');

// Render book view
router.get('/', (req, res) => {
    let entries;
    let filter = req.query.filter;
    if (typeof filter === 'string' && filter.length > 0) {
        entries = BookController.filter(filter);
    } else {
        entries = BookController.all();
        filter = '';
    }
    res.render('books', {entries: entries, filter: filter});
});

// Render book edit view for new entry
// consider moving edit routers to separate view
router.get('/edit/new', (req, res) => {
    res.render('edit-book', {new: true});
});

// Render book edit view for existing entry
// consider moving edit routers to separate view
router.get('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = BookController.get(id);
    res.render('edit-book', {book: book});
});

// List all books
router.get('/api/books', (req, res) => {
    res.send(BookController.all());
});

// Add book
router.post('/api/book', (req, res) => {
    res.send(BookController.add(req.body));
});

// Remove book
const removeHandler = (req, res) => {
    res.send(BookController.remove(parseInt(req.params.id)));
};
router.delete('/api/book/:id', removeHandler);
// in case delete method is not supported
router.post('/api/remove-book/:id', removeHandler);

// Update book
const updateHandler = (req, res) => {
    res.send(BookController.update(parseInt(req.params.id), req.body));
};
router.put('/api/book/:id', updateHandler);
// in case put method is not supported
router.post('/api/update-book/:id', updateHandler);

module.exports = router;