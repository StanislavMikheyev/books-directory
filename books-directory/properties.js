'use strict';

// Provide access to values of properties.ini in repo_root/books-directory/books-directory

const propertiesReader = require('properties-reader');
module.exports = propertiesReader(__dirname + '/properties.ini');