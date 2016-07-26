'use strict';

const _ = require('lodash');
const express = require('express')

const app = express()

const sergeants = [
    'Olaf',
    'Maurits',
    'Diego',
    'Tobias',
    'Denny',
    'Chris O',
    'Robert'
];

app.set('port', process.env.PORT || 5000);

app.get('/sergeant/list', (req, res) => {
    res.send({names: sergeants});
});

app.get('/sergeant/today', (req, res) => {
    res.send({name: randomSergeant()});
});

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});

function randomSergeant() {
    return sergeants[_.random(sergeants.length - 1)];
}
