var api         = require('../api_tester')
  , expect      = require('chai').expect
  , test_helper = require('../test_helper');

describe("/user/problem/:problemId", function() {
  it('can get a new problem', function(done) {
    api.withUser(function(user) {
      api
      .get('/v1/views/searchView')
      .setUser(user)
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);

        var problem = res.body[0];

        api
        .get("/v1/user/problem/" + problem.problemId)
        .setUser(user)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
      });
    });
  });
});

describe("/user/problem/:problemId", function() {
  it('can save a new problem', function(done) {
    api.withUser(function(user) {
      api
      .get('/v1/views/searchView')
      .setUser(user)
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);

        var problem = res.body[0];

        api
        .post("/v1/user/problem/" + problem.problemId)
        .setUser(user)
        .send({saved: true, trackStatus: "hello"})
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          
          api
          .get("/v1/user/problem/" + problem.problemId)
          .setUser(user)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);

            expect(res.body.trackStatus).to.equal("hello");
            expect(res.body.saved).to.equal(true);
            
            api
            .post("/v1/user/problem/" + problem.problemId)
            .setUser(user)
            .send({saved: false, trackStatus: "remove"})
            .expect(200)
            .end(function(err, res) {
              if (err) return done(err);

              expect(res.body.trackStatus).to.equal("remove");
              expect(res.body.saved).to.equal(false)

              api
              .get("/v1/views/problemView/" + problem.problemId)
              .setUser(user)
              .expect(200)
              .end(function(err, res) {
                if (err) return done(err);

                expect(res.body.trackStatus).to.equal("remove");
                expect(res.body.saved).to.equal(false)

                done();
              });
            });
          });
        });
      });
    });
  });
});