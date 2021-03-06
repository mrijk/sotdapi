'use strict';

const _ = require('lodash');
const dateFormat = require('dateformat');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// List of available sergeants

const sergeants = [
    'Olaf',
    'Maurits',
    'Diego',
    'Tobias',
    'Danny',
    'Chris O',
    'Robert',
    'Matthijs'
];

// (Static) schedule 

const schedule = [];

app.set('port', process.env.PORT || 5000);

// Return list of all sergeants
app.get('/sergeant/list', (req, res) => {
    res.send({names: sergeants});
});

// Return sergeants of the day
app.get('/sergeant/today', (req, res) => {

    const now = new Date();
    const date = dateFormat(now, 'yyyy-mm-dd');

    const today = _.filter(schedule, {date: date});
    const omitDay = _.partialRight(_.omit, 'date');

    res.send(_.map(today, omitDay));
});

// Return current sergeant
app.get('/sergeant/now', (req, res) => {

    const now = new Date();
    const date = dateFormat(now, 'yyyy-mm-dd');
    const ampm = dateFormat(now, 'TT');

    const today = _.filter(schedule, {date: date, ampm: ampm});
    const name = _.first(today).name;
    
    res.send({name: name});
});

app.param(['name'], (req, res, next, value) => {
    req.name = value;
    next();
});

// return complete schedule
app.get('/schedule', (req, res) => {
    res.send({schedule: schedule});
});

// return schedule for given sergeant
app.get('/schedule/:name', (req, res) => {
    const mySchedule = _.filter(schedule, {name: req.name});
    res.send({schedule: mySchedule});
});

// update schedule
app.post('/schedule', (req, res) => {
    const body = req.body;
    const slot1 = _.find(schedule, slot => _.isEqual(slot, body.slot1));
    const slot2 = _.find(schedule, slot => _.isEqual(slot, body.slot2));

    if (_.isUndefined(slot1) || _.isUndefined(slot2)) {
        res.status(500).send('Could not find one of the 2 slots!');
    } else {
        const name = slot1.name;
        slot1.name = slot2.name;
        slot2.name = name;
        
        res.send('Updated schedule!');
    }
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
