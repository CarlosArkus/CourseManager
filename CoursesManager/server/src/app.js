const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { PORT } = require('./config');
const app = express();

app.set('port', PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./Routes'));
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
})

module.exports = app;
