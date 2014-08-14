var app      = require('./web/app')
  , server   = require('http').createServer(app)
  , mongoose = require('mongoose')
  , config   = require('./config');

mongoose.connect(config.get('MONGO'));
server.listen(config.get('PORT'));
