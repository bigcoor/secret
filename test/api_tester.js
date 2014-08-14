var VERSION   = "v1"

var app       = require('../api/app')
  , supertest = require('supertest')
  , api       = supertest(app)
  , mongoose  = require('mongoose');

supertest.Test.prototype.setUser = function(user) {
  this
  .set("userId", user.userId)
  .set("token", user.token);

  return this;
};

api.withUser = function(callback) {
  this
  .post('/v1/users/skipLogin')
  .end(function(err, res) {
    if (err) return done(err);

    callback(res.body);
  });
};

api.withEmailUser = function(callback) {
  this
  .post('/v1/users/emailLogin')
  .send({
    "email"          : "test@cur.es",
    "password"       : "1.23456"}
    )
  .expect(200)
  .end(function(err, res) {
    if(err) done(err);
    callback(res.body);
  });
};

module.exports = api;