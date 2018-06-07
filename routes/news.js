const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Response = require('../classes/response');
const request = require('request');

router.get('/top-headlines', async (req, res) => {
    const url = 'https://newsapi.org/v2' + req.url
        + '&apiKey=0d242696694c489ebccfad34c50c5f4d';
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            return res.status(200).send(response.body);
        } else {
            return res.status(400).send(response);
        }
    });
});

router.post('/', auth, async (req, res) => {
    let response = new Response();
    const {error} = validate(req.body);
    if (error) {
        response.status = 400;
        response.message = error.details[0].message;
        return res.status(400).send(response);
    }

    response.data = new Genre({name: req.body.name});
    response.data = await response.data.save(function (err, result) {
        if (err) {
            response.status = 500;
            response.message = err.message;
            return res.status(500).send(response);
        } else {
            response.status = 200;
            response.data = result;
            response.message = 'Genres created successfully';
            return res.send(response);
        }
    });
});

router.put('/:id', [auth, validateObjectId], async (req, res) => {
    let response = new Response();
    const {error} = validate(req.body);
    if (error) {

    }
    return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    });

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    let response = new Response();
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

router.get('/:id', validateObjectId, async (req, res) => {
    let response = new Response();
    response.data = await Genre.findById(req.params.id);

    if (!response.data) {
        response.status = 404;
        response.message = 'Genere found with given ID';
        return res.status(404).send(response);
    } else {
        response.status = 200;
        response.message = 'Genere not found with given ID.';
        return res.status(200).send(response);
    }
});

module.exports = router;