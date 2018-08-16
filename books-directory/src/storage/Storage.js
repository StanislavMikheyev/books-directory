'use strict';

// Simple storage implementation with load from/save to the local file functionality

const fs = require('fs');
const path = require('path');
const props = require('../../properties');
const storageFile = path.join(__dirname, '..', '..', props.get('storagePath'));

class Storage {
    // Set default storage
    constructor(dataType) {
        this.jsonStorage = {entries: [], lastId: 0};
        this.dataType = dataType;
    }

    add(entry) {
        entry.id = this.jsonStorage.lastId++;
        this.jsonStorage.entries.push(entry);
        return entry;
    }

    remove(id) {
        const index = this.jsonStorage.entries.findIndex((element) => {
            return element.id === id;
        });
        return this.jsonStorage.entries.splice(index, 1)[0];

    }

    update(entry) {
        const index = this.jsonStorage.entries.findIndex((element) => {
            return element.id === entry.id;
        });
        if (index === -1) {
            return undefined;
        }
        this.jsonStorage.entries.splice(index, 1, entry);
        return entry;
    }

    get(id) {
        return this.jsonStorage.entries.find((element) => {
            return element.id === id
        });
    }

    getAll() {
        return this.jsonStorage.entries
    }

    loadFromPersistentStorageSync() {
        const data = fs.readFileSync(storageFile);
        this.jsonStorage = JSON.parse(data);
    }

    saveToPersistentStorage() {
        return new Promise((resolve) => {
            const stringifiedStorage = JSON.stringify(this.jsonStorage);
            fs.writeFile(storageFile, stringifiedStorage, (err) => {
                resolve();
            })
        });
    }

    loadFromPersistentStorage() {
        return new Promise((resolve) => {
            fs.readFile(storageFile, (err, data) => {
                this.jsonStorage = JSON.parse(data);
                resolve();
            })
        });
    }

    // Return only entries that fulfil checkFunction
    filter(checkFunction) {
        return this.jsonStorage.entries.filter((entry) => (checkFunction(entry)));
    }
}

module.exports = Storage;