'use strict';

module.exports = class Book {
    constructor() {
        this.title = null;
        this.author = null;
        this.id = null;
    }

    // Use rawData field values if such exist to populate book fields
    parseRawData(rawData) {
        if (typeof rawData !== 'object') {
            return;
        }
        if (rawData.title !== undefined) {
            this.title = rawData.title;
        }
        if (rawData.author !== undefined) {
            this.author = rawData.author;
        }
    }
};