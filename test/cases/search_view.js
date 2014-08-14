var api         = require('../api_tester')
  , expect      = require('chai').expect
  , test_helper = require('../test_helper');

describe('/views/searchView', function() {
  it('returns all production-ready problems', function(done) {
    api.withUser(function(user) {
      api
      .get('/v1/views/searchView')
      .setUser(user)
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);

        var problems = res.body;
        
        expect(problems).to.be.an('array');
        expect(problems).to.have.length.above(0);

        var firstProblem = problems[0];
        expect(firstProblem.problemId).to.exist;
        expect(firstProblem.problemName).to.exist;
        expect(firstProblem.problemDescription).to.exist;
        expect(firstProblem.problemPopularity).to.exist;

        done();
      })
    });
  });
});