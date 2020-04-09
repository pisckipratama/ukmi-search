const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const { Pool } = require('pg');
const pool = new Pool({
  user: 'ezdcjmwkqijcfe',
  host: 'ec2-54-147-209-121.compute-1.amazonaws.com',
  database: 'd5d61lskdpugm',
  password: '1a7eff832d87660bd443ed4c4dc9d35e982ec085a19c4076ebd4ce4d9198392d',
  port: 5432
})
console.log("successfull connect to the database")

const indexRouter = require('./routes/index')(pool);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
