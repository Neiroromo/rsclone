const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const usersRouter = require('./routes/usersRouter');
const indexRouter = require('./routes/indexRouter');
const articlesRouter = require('./routes/articlesRouter');
const cors = require('cors');
// const globalErrorHandler = require('./controllers/errorController');
// const AppError = require('./utils/appError');

const app = express();
const corsOptions = {
  origin: 'http://localhost:8000',
  methods: 'GET,POST,DELETE,PATCH',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors(corsOptions));
app.use(
  '/css',
  express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))
);
app.use(
  '/js',
  express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'))
);

app.use(
  '/js',
  express.static(path.join(__dirname, 'node_modules/jquery/dist'))
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(cookieParser());

app.get('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/articles', articlesRouter);
app.all('*', (req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    url: req.originalUrl,
    message: 'Такой ссылки не существует!',
  });
});

// app.use(globalErrorHandler);
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (err.message.startsWith('E11000')) {
    err.message = 'Данное имя уже занято!';
  }
  res.status(err.statusCode).json({
    status: err.status,
    name: err.name,

    message: err.message,
  });
});
module.exports = app;
