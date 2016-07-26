'use strict';

const _ = require('lodash');
const express = require('express')

const app = express()

const sergeants = [
    'Olaf',
    'Maurits',
    'Diego',
    'Tobias',
    'Danny',
    'Chris O',
    'Robert'
];

const schedule = [];

app.set('port', process.env.PORT || 5000);

// Return list of all sergeants
app.get('/sergeant/list', (req, res) => {
    res.send({names: sergeants});
});

// Return sergeant of the day
app.get('/sergeant/today', (req, res) => {
    res.send({name: randomSergeant()});
});

// return schedule for given sergeant
app.get('/schedule/:name', (req, res) => {
    res.send(req.name);
});

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});

function randomSergeant() {
    return sergeants[_.random(sergeants.length - 1)];
}
