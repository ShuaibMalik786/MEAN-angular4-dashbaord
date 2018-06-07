const express = require('express');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const returns = require('../routes/returns');
const error = require('../middleware/error');
const news = require('../routes/news');
module.exports = function (app) {
    app.use(express.json());
    app.use('/api/v1/genres', genres);
    app.use('/api/v1/customers', customers);
    app.use('/api/v1/movies', movies);
    app.use('/api/v1/rentals', rentals);
    app.use('/api/v1/users', users);
    app.use('/api/v1/news', news);
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/returns', returns);
    app.use(error);
}