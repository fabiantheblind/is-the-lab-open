// express
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var compression = require('compression');
var hbs = require('express-hbs');
// own modules
var cache = require('./app/cache');
var api = require('./app/api');
var path = require('path');
var http = require('http');
// routes
var routes = require('./routes');
var about = require('./routes/about');
// auth
var auth = require('./app/auth');
var passport = require('passport');
var Strategy = require('passport-http').BasicStrategy;
// var favicon = require('serve-favicon');
// var cookieParser = require('cookie-parser');

// taken from here
// https://github.com/passport/express-3.x-http-basic-example
passport.use(new Strategy(
  function(username, password, cb) {
    auth.findByUsername(username, function(err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  }));

var port = 61424;

var app = express(); // create the app
app.disable('strict routing');
// compress with gzip
app.use(compression());
// setup the port
app.set('port', process.env.PORT || port);
// view engine setup (handlebars)
app.set('view engine', 'hbs');
app.engine('hbs', hbs.express4({
  defaultLayout: __dirname + '/views/layouts/default.hbs',
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts'
}));
app.set('views', path.join(__dirname, 'views'));
// get the environment into a setting
if (app.get('env') === 'development') {
  app.set('dev', true);
}
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(methodOverride());
// we are not on the root level in production
if (app.get('env') === 'development') {
  app.use('/is-the-lab-open', express.static(path.join(__dirname, '/public')));
} else if (app.get('env') === 'production') {
  app.use( express.static(path.join(__dirname, '/public')));
}
if (app.get('env') === 'development') {
  app.use(errorHandler());
}
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
// setup all routing
app.get('/', routes.index);
app.get('/who', about.who);
app.get('/what', about.what);
app.get('/why', about.why);
app.get('/how', about.how);
app.get('/api/:value', passport.authenticate('basic', {
  session: false
}), api.set);
// get the badge file. Generated by
app.get('/badge.svg', function(req, res, next) {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.sendFile(__dirname + '/public/images/badge.svg');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  if (app.get('env') === 'development') {
    console.log(req);
    // console.log(req);
  }
  var err = new Error('Sorry. This url was not found');
  err.status = 404;
  next(err);
});
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var server = http.createServer(app);
server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});