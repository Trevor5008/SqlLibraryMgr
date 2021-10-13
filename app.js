var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Book = require('./models');

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  // creates new error and sets status and message
  next(createError(404, 'That page does not exist'));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.message = err.message;
  // log error status and message
  console.log(err.status, err.message)
  // render the matching error page
  if (err.status === 404) {
    res.render('page-not-found', { err });
  } else {
    err.message = err.message || 'Oops! It looks like something went wrong on the server.';
    res.render('error', { err });
  }
});

module.exports = app;
