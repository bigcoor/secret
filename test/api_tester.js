var app       = require('../web/app')
  , supertest = require('supertest')
  , api       = supertest(app)
  
module.exports = api;