const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const routes = require('./routes');

const { PORT } = require('./config');
const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: 'Courses Manager',
      description: 'Mind teams code challenge',
      contact: {
        name: 'Carlos'
      },
    },
    components: {
      securitySchemes: {
        apiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'auth-token'
        }
      }
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ["./src/routes/**.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.set('port', PORT);

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
})

module.exports = app;
