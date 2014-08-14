var api         = require('../api_tester')
  , expect      = require('chai').expect
  , test_helper = require('../test_helper');
  
describe('Token Authentication', function() {
  it('errors when calling an endpoint that requires user with no user in header', function(done) {
    api
    .get('/v1/views/organizerView')
    .expect(400, {error: "userId and token required in header"}, done)
  });

  it('errors with fake token/UserId pair', function(done) {
    api
    .get('/v1/version/updateRequired')
    .set("userId", "bogus id")
    .set("token", "bogus token")
    .expect(400, {error: "invalid token"}, done)
  });

  it('errors with valid UserId but fake token', function(done) {
    api.withUser(function(user) {
      api
      .get('/v1/version/updateRequired')
      .set("userId", user.userId)
      .set("token", "this is a fake token")
      .expect(400, {error: "invalid token"})
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });
  });

  it('succeeds with valid UserId and token', function(done) {
    api.withUser(function(user) {
      api
      .get('/v1/version/updateRequired')
      .send({versionNumber: "1.0.2"})
      .set("userId", user.userId)
      .set("token", user.token)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
    });
  });
});