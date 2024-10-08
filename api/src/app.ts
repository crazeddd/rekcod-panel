//Npm Imports
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

//Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dockerRouter = require('./routes/docker');

var app = express(); //Init new express instance

//Express tools
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //URL encoding
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //Serve static files

//CORS functionality
app.use(cors({
  origin: ['http://localhost:3000'], //Allowed origins
  methods: ['GET', 'POST', 'PUT'] //Allowed methods
}));

//Router paths
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/docker', dockerRouter);


// Error handler
app.use(function(err : any, req : any, res : any, next: any) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
