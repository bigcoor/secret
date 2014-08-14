var api         = require('../api_tester')
  , test_helper = require('../test_helper')
  , expect      = require('chai').expect;


describe('can get a treatment by id', function(){
  it("error when treatment is not provided", function(done){
    api.withEmailUser(function(user) {
      api
      .get('/v1/treatments/52d89fdbfd1b51de8c292edd')
      .setUser(user)
      .expect(200)
      .end(function(err, res){
        expect(res.body.id).to.equal('52d89fdbfd1b51de8c292edd');
        done();
      });
    });
  });
});

describe('submit a vote for treatment and get', function() {
  it("error when submit a vote for treatment", function(done) {
    api.withEmailUser(function(user) {
      api
      .get('/v1/users/000000000000000000000002/treatment/52d89fdbfd1b51de8c292edd/vote/1')
      .setUser(user)
      .expect(200)
      .end(function(err, res) {
        expect(res.body.vote).to.equal(true);

        api.get('/v1/treatments/52d89fdbfd1b51de8c292edd/vote')
        .setUser(user)
        .end(function(err, res) {
    
          expect(res.body.upvote).to.equal(1);
          expect(res.body.downvote).to.equal(0);
        });

        api.get('/v1/users/000000000000000000000002/treatment_votes/52d89fdbfd1b51de8c292edd')
        .setUser(user)
        .expect(200)
        .end(function(err, res) {
          expect(res.body.treatmentId).to.equal('52d89fdbfd1b51de8c292edd');
          expect(res.body.vote).to.equal(true);
          expect(res.body.userId).to.equal('000000000000000000000002');

          done();
        });
      });
    });
  });
});