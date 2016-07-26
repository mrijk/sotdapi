'use strict';

const _ = require('lodash');
const dateFormat = require('dateformat');
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

const schedule = [];

app.set('port', process.env.PORT || 5000);

// Return list of all sergeants
app.get('/sergeant/list', (req, res) => {
    res.send({names: sergeants});
});

// Return sergeant of the day
app.get('/sergeant/today', (req, res) => {

    const now = new Date();
    const date = dateFormat(now, 'yyyy-mm-dd');

    const todaySchedule = _.filter(schedule, {date: date});
    
    res.send({name: todaySchedule});
});

app.param(['name'], (req, res, next, value) => {
    req.name = value;
    next();
});

// return schedule for given sergeant
app.get('/schedule', (req, res) => {
    res.send({schedule: schedule});
});

// return schedule for given sergeant
app.get('/schedule/:name', (req, res) => {
    const mySchedule = _.filter(schedule, {name: req.name});
    res.send({schedule: mySchedule});
});

function init() {
    addEntryToSchedule('2016-07-26', 'AM', 'Olaf');
    addEntryToSchedule('2016-07-26', 'PM', 'Maurits');
    addEntryToSchedule('2016-07-27', 'AM', 'Danny');
    addEntryToSchedule('2016-07-27', 'PM', 'Olaf');
    
    app.listen(app.get('port'), () => {
        console.log('Node app is running on port', app.get('port'));
    });
}

init();

function addEntryToSchedule(date, ampm, name) {
    schedule.push({date: date, ampm: ampm, name: name});
}

function randomSergeant() {
    return sergeants[_.random(sergeants.length - 1)];
}
