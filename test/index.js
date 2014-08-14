var mongoose  = require('mongoose')
  , async     = require('async')
  , config    = require('../config')
  , fixtures  = require('../lib/fixtures')

var seedContent = function(done) {
  done();
};

mongoose.connect(config.get("MONGO"));

var Problem   = require('../models/problem')
  , Symptom   = require('../models/symptom')
  , Treatment = require('../models/treatment')
  , User      = require('../models/user')

var fixtureConfig = [{
    collection: Problem, 
    fixture:    require('./fixtures/problems')
  }, {
    collection: Symptom, 
    fixture:    require('./fixtures/symptoms')
  }, {
    collection: Treatment, 
    fixture:    require('./fixtures/treatments')
  }, {
    collection: User, 
    fixture:    require('./fixtures/users')
  }];

describe(null, function() {
  // nuke db and load fixtures before every test
  beforeEach(function(done) {
    async.series([
      function(callback) {
        fixtures.reset(callback);
      },
      function(callback) {
        // async.each(fixtureConfig, function(fixture, done) {
        //   fixtures.load(fixture.collection, fixture.fixture, done);
        // }, done);
        fixtures.autoLoad(__dirname + "/fixtures", callback);
      }
    ], done);
  });

  var endsWithJs = /\.js$/;

  require("fs").readdirSync(__dirname + "/cases").forEach(function(file) {
    if (endsWithJs.test(file)) require("./cases/" + file);
  });
});