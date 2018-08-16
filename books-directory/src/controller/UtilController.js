'use strict';

// Use singleton storage
const storage = require('../storage/staticBookStorage');

module.exports = class UtilController {
    // Load storage from storage.json file in the root of books-directory project subfolder
    static loadFromFile() {
        return storage.loadFromPersistentStorage();
    }

    // Save in memory storage to storage.json file in the root of books-directory project subfolder
    static saveToFile() {
        return storage.saveToPersistentStorage();
    }
};