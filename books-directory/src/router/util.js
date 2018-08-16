'use strict';

const express = require('express');
const router = express.Router();

const UtilController = require('../controller/UtilController');

// Save storage to the file and return 200 all the time
router.get('/save', (req, res) => {
    UtilController.saveToFile().then(() => {
        res.sendStatus(200)
    });
});

// Load storage from the file and return 200 all the time
router.get('/load', (req, res) => {
    UtilController.loadFromFile().then(() => {
        res.sendStatus(200)
    });
});

module.exports = router;