const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const routes = require('./routes');

const { PORT } = require('./config');
const app = express();

const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: 'http://localhost:3000/swagger-v1.json',
        name: 'Version 1'
      },
      {
        url: 'http://localhost:3000/swagger-v2.json',
        name: 'Version 2'
      }
    ]
  }
};

app.use(express.static('src/public'));

app.set('port', PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(null, swaggerOptions));
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
})

module.exports = app;
