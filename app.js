const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const userRouter = require('./routes/userRoute');
const ErrorHandler = require('./utils/errorHandler');
const globalErrorHandler = require('./controllers/errorController');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'User API',
    },
    servers: [
      {
        url: 'https://busy-teal-chameleon-gear.cyclic.app',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

const app = express();
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());

app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(mongoSanitize());
app.use(xss());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
