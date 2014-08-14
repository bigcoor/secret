var express = require('express')
  , path    = require('path')
  , bcrypt  = require('bcrypt')
  , app     = express()
  , config  = require('../config');

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
 
  if (config.get('VERBOSE')) app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.cookieParser());
  app.use(express.methodOverride());
  app.use(express.cookieSession({secret: "qwertyuopkjsdfm", cookie: { maxAge: 1000 * 60 * 60 * 24 }}));
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, '/public')));

  app.use(app.router);
});

// **  Bootstrap routes
require('./routes')(app);

module.exports = app;
