var api         = require('../api_tester')
  , test_helper = require('../test_helper')
  , expect      = require('chai').expect;

describe("submit a track for user", function() {
  it("error when a user submit track faile", function(done) {
    api.withEmailUser(function(user) {
      api
      .post("/v1/track")
      .setUser(user)
      .send({
          userFeeling:         6
        , journalText:         "I am good"
        , userSelectedEffects: ["52d89fd8fd1b51de8c29213c", "52d89fd8fd1b51de8c29213d"]
        , user:                {id: "000000000000000000000002"} 
      })
      .end(function(err, res) {
        expect(res.body).to.not.be.empty;
  
        api
        .get("/v1/track")
        .setUser(user)
        .end(function(err, res) {
          expect(res.body.userFeeling).to.equal(6);
          expect(res.body.userSymptomIds).to.have.length(2);
          
          done();
        });
      });
    });
  });
});

describe('submit treatment state change', function() {
  it("error when submit a treatment state", function(done) {
    api.withEmailUser(function(user) {
      api
      .put("/v1/track/treatment")
      .setUser(user)
      .send({treatmentId: "52d89fdbfd1b51de8c292edd", status: "test"})
      .end(function(err, res) {
        expect(res.body).to.not.be.empty;
        done();
      });
    });
  });
});

describe('submit problem state change', function(){
  it("error when submit a problem state", function(done) {
    api
    .withEmailUser(function(user){
      api
      .put("/v1/track/problem")
      .setUser(user)
      .send({problemId: "52d89fd8fd1b51de8c29213e", status: "test" })
      .end(function(err, res) {
        expect(res.body).to.not.be.empty;
        done();
      });
    });
  });
});