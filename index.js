'use strict'

const express = require('express');
const path  = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express()

// use morgan logging middleware
app.use(morgan('dev'));

// use body-parser middleware
app.use(bodyParser.json()); // parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // parse URL requests


app.use(express.static(path.join(__dirname, 'public')));

// send index.html
app.use('*', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(3000, () => console.log('listening on port 3000!'))
app.use((err, req, res, next) =>
  res.sendStatus(err.status|| 500).send(err.message || 'Internal server error')
);