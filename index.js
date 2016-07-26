'use strict';

const _ = require('lodash');
const express = require('express');

const app = express();

// List of available sergeants

const sergeants = [
    'Olaf',
    'Maurits',
    'Diego',
    'Tobias',
    'Danny',
    'Chris O',
    'Robert'
];

// (Static) schedule 

const schedule = [
];

app.set('port', process.env.PORT || 5000);

// Return list of all sergeants
app.get('/sergeant/list', (req, res) => {
    res.send({names: sergeants});
});

// Return sergeant of the day
app.get('/sergeant/today', (req, res) => {
    res.send({name: randomSergeant()});
});

app.param(['name'], (req, res, next, value) => {
    req.sergeant = value;
    next();
});

// return schedule for given sergeant
app.get('/schedule', (req, res) => {
    const dummySchedule = [
        {
            date: '2016-07-26AM',
            name: 'Olaf'
        },
        {
            date: '2016-07-26PM',
            name: 'Maurits'
        }

    ];
    res.send({schedule: dummySchedule});
});

// return schedule for given sergeant
app.get('/schedule/:name', (req, res) => {
    res.send({schedule: req.sergeant});
});
    
app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});

function randomSergeant() {
    return sergeants[_.random(sergeants.length - 1)];
}
