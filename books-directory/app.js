'use strict';

// Get properties
const props = require('./properties');

// Import express
const express = require('express');
const app = express();

// Set up body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up static content directory
app.use(express.static(__dirname + '/public'));

// Set up session support
const session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

// Set up handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    // defaultLayout: 'main'
}));
const path = require('path');
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/src/view'));

// Set up routers
const bookRouter = require('./src/router/book');
app.use('/', bookRouter);
const utilRouter = require('./src/router/util')
app.use('/util', utilRouter);

// Initiate server
app.listen(props.get('port'), () => console.log('Example app listening on port 3000!'));