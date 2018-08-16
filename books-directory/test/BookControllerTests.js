'use strict';

const BookController = require('../src/controller/BookController');
const storage = require('../src/storage/staticBookStorage');
const assert = require('assert');

describe('BookController', () => {
    // reset storage before each test
    beforeEach(() => {
        storage.jsonStorage = {entries: [], lastId: 0};
    });
    describe('#all()', () => {
        it('should return no entries by default', () => {
            assert.strictEqual(BookController.all().length, 0);
        });
        it('should return two entries', () => {
            BookController.add({title: 'test1'});
            BookController.add({title: 'test2'});
            let all = BookController.all();
            assert.strictEqual(all[0].title, 'test1');
            assert.strictEqual(all[0].id, 0);
            assert.strictEqual(all[1].title, 'test2');
            assert.strictEqual(all[1].id, 1);
        });
    });
    describe('#get(id)', () => {
        it('should return appropriate book when id is valid', () => {
            BookController.add({title: 'test'});
            let get = BookController.get(0);
            assert.strictEqual(get.title, 'test');
            assert.strictEqual(get.id, 0);
        });
        it('should return undefined when there is no such id', () => {
            assert.strictEqual(BookController.get(0), undefined);
        });
        it('should return undefined when id is not a number', () => {
            assert.strictEqual(BookController.get('not number'), undefined);
        });
    });
    describe('#add(rawData)', () => {
        it('should add entry', () => {
            assert.strictEqual(BookController.all().length, 0);
            BookController.add({title: 'test'});
            assert.strictEqual(BookController.all().length, 1);
            let val = BookController.get(0);
            assert.strictEqual(val.title, 'test');
            assert.strictEqual(val.id, 0);
        });
        it('should add entry and return it with id', () => {
            let val = BookController.add({title: 'test'});
            assert.strictEqual(val.title, 'test');
            assert.strictEqual(val.id, 0);
        });
    });
    describe('#update(id, rawData)', () => {
        it('should update record with provided id', () => {
            BookController.add({title: 'test'});
            let get = BookController.get(0);
            assert.strictEqual(get.title, 'test');
            assert.strictEqual(get.id, 0);
            BookController.update(0, {title: 'new value'});
            get = BookController.get(0);
            assert.strictEqual(get.title, 'new value');
            assert.strictEqual(get.id, 0);
        });
        it('should return updated entry', () => {
            BookController.add({title: 'test'});
            const val = BookController.update(0, {title: 'new value'});
            assert.strictEqual(val.title, 'new value');
            assert.strictEqual(val.id, 0);
        });
        it('should return undefined when id does not exist', () => {
            let value = BookController.update(0, {title: 'new value'});
            assert.strictEqual(value, undefined);
        });
    });
    describe('#remove(id)', () => {
        it('should remove entry with provided id', () => {
            BookController.add({title: 'test'});
            let val = BookController.get(0);
            assert.strictEqual(val.title, 'test');
            assert.strictEqual(val.id, 0);
            BookController.remove(0);
            val = BookController.all();
            assert.strictEqual(val.length, 0);
        });
        it('should return removed entry', () => {
            BookController.add({title: 'test'});
            const val = BookController.remove(0);
            assert.strictEqual(val.title, 'test');
            assert.strictEqual(val.id, 0);
        });
        it('should return undefined when id does not exist', () => {
            let value = BookController.remove(0);
            assert.strictEqual(value, undefined);
        });
    });
    describe('#filter(value)', () => {
        it('should return only books where title contains letter A', () => {
            BookController.add({title: 'AB'});
            BookController.add({title: 'BC'});
            BookController.add({title: 'CA'});
            let all = BookController.filter('A');
            assert.strictEqual(all[0].title, 'AB');
            assert.strictEqual(all[0].id, 0);
            assert.strictEqual(all[1].title, 'CA');
            assert.strictEqual(all[1].id, 2);
        });
        it('should return nothing when search term is absent from every entry', () => {
            BookController.add({title: 'AB'});
            BookController.add({title: 'BC'});
            BookController.add({title: 'CA'});
            let all = BookController.filter('D');
            assert.strictEqual(all.length, 0);
        });
        it('should return nothing when search term is not a string', () => {
            let all = BookController.filter(13);
            assert.strictEqual(all.length, 0);
        });
    });
});