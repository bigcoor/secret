var api         = require('../api_tester')
  , test_helper = require('../test_helper')
  , expect      = require('chai').expect;

describe('/views/treatmentView', function() {
  it('returns correct treatment info', function(done) {
    api.withUser(function(user) {
      api
      .get('/v1/views/searchView')
      .setUser(user)
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);

        var problems = res.body;
        
        api
        .get('/v1/views/problemView/' + problems[1].problemId)
        .setUser(user)
        .expect(200)
        .end(function(err, res) {
          var treatmentId = res.body.data[0].results[0].treatmentId;

          api
          .get('/v1/views/treatmentView/' + 'treatmentId')
          .setUser(user)
          .expect(200)
          .end(function(err, res) {
            // console.log(res.body.tips[0]);
            done();  
          })
          
        });
      })
    });
  });
});