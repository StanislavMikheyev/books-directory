'use strict';

// Use singleton storage
const storage = require('../storage/staticBookStorage');
const {Book} = require('../model');

module.exports = class BookController {

    // Get all entries in storage
    static all() {
        return storage.getAll();
    }

    // Get single entry where id is equal to id parameter
    static get(id) {
        if (typeof id !== 'number') {
            return undefined;
        }
        return storage.get(id);
    }

    // Add new book using raw data in parameter, if rawData malformed or not complete default values used
    static add(rawData) {
        const book = new Book();
        book.parseRawData(rawData);
        storage.add(book);
        return book;
    }

    // Similar to add but instead of creating a new entry it deletes old entry with id equal to first parameter
    // and replaces it with new book using rawData from second parameter
    static update(id, rawData) {
        const book = new Book();
        book.parseRawData(rawData);
        book.id = id;
        return storage.update(book);
    }

    // Remove entry from storage with id equal to first parameter
    static remove(id) {
        return storage.remove(id);
    }

    // Filter storage and return only records with 'value' contained as substring
    static filter(value) {
        // NOTE:
        // This filtering is pretty simple and does not require regex like it is written in specification
        // More complicated filtering with regex can be easily implemented here
        return storage.filter((entry) => entry.title.includes(value));
    }
};