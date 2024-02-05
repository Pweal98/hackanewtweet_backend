var express = require('express');
require('./models/connection');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const cors = require('cors');
var app = express();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messagesRouter = require('./routes/messages')

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);
module.exports = app;
