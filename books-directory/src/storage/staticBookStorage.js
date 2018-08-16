'use strict';

// Singleton for Storage of type Book

const Storage = require('./Storage');
const {Book} = require('../model');

module.exports = new Storage(Book);