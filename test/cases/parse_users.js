var api         = require('../api_tester')
  , expect      = require('chai').expect
  , sinon       = require('sinon')  
  , test_helper = require('../test_helper')

var edwinParseId = "7uqi5vrFsk";

describe('/parseUsers/migrate', function() {
  it('migrate a parse user', function(done) {
    done();
    // this.timeout(20000);
    // api
    // .post('/v1/parseUsers/' + edwinParseId + '/migrate')
    // .expect(200)
    // .end(function(err, res) {
    //   if (err) {
    //     done(err);
    //     return;
    //   }
      
    //   var user = res.body;

    //   api
    //   .setUser(api.get('/v1/views/organizerView'), user)
    //   .expect(200)
    //   .end(function(err, res) {
    //     if (err) {
    //       done(err);
    //       return;
    //     }

    //     expect(res.body.trackedTreatments).to.be.an('array');
    //     expect(res.body.trackedTreatments).to.have.length.of(2);

    //     expect(res.body.savedTreatments).to.be.an('array');
    //     expect(res.body.savedTreatments).to.have.length.of(1);

    //     expect(res.body.trackedProblems).to.be.an('array');
    //     expect(res.body.trackedProblems).to.have.length.of(2);

    //     expect(res.body.savedProblems).to.be.an('array');
    //     expect(res.body.savedProblems).to.have.length.of(1);

    //     done();
    //   });
    // })
  });
});