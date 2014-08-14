var api         = require('../api_tester')
  , test_helper = require('../test_helper')
  , expect      = require('chai').expect
  , fixtures    = require('../../lib/fixtures')
  , underscore  = require('underscore')
  , async       = require('async')

var TreatmentUser = require('../../models/treatment_user')
  , Treatment     = require('../../models/treatment')
  , Problem       = require('../../models/problem')
  , ProblemUser   = require('../../models/problem_user')
  , User          = require('../../models/user')

// seed data
var treatmentStopped = { 
    tracked     : true
  , trackStatus : "stopped"
  , userId      : "000000000000000000000001"
  , treatmentId : "52d89fdbfd1b51de8c292edd"
},
treatmentTrackedSaved = { 
    tracked     : true
  , trackStatus : "tracking"
  , saved       : true
  , saveStatus  : "saved"
  , userId      : "000000000000000000000001"
  , treatmentId : "52d89fdbfd1b51de8c292ede"
};

var problemStopped = { 
  tracked     : true
, trackStatus : "stopped"
, userId      : "000000000000000000000001"
, problemId   : "52d89fd8fd1b51de8c29213e" 
}, 
problemTrackedSaved     = { 
  tracked     : true
, trackStatus : "tracking"
, saved       : true
, saveStatus  : "saved"
, userId      : "000000000000000000000001"
, problemId   : "52d89fd8fd1b51de8c292146"
};

var seedData = function(callback) {
  async.parallel([
    function(callback) {
      TreatmentUser.create([treatmentStopped, treatmentTrackedSaved], callback);
    },
    function(callback) {
      ProblemUser.create([problemStopped, problemTrackedSaved], callback);
    }
  ], callback)
};

describe('/views/organizerView', function() {
  it('returns well-formed organizer contents', function(done) {
    seedData(function(err, results) {
      api
      .get('/v1/views/organizerView')
      .setUser(fixtures.data['user_access_tokens'][0])
      .expect(200)
      .end(function(err, res) {
        if (err) { done(err); }
        else {
          var data = res.body;

          // tracked treatments
          expect(data.trackedTreatments).to.be.an('array');
          expect(data.trackedTreatments).to.have.length.of(2);

          var trackedTreatment = _.where(data.trackedTreatments, {status: 'tracking'});
          expect(trackedTreatment).to.have.length.of(1);

          expect(trackedTreatment[0].treatment.treatmentId)
            .to.equal(treatmentTrackedSaved.treatmentId);

          var stoppedTreatment = _.where(data.trackedTreatments, {status: 'stopped'});
          expect(stoppedTreatment).to.have.length.of(1);
          expect(stoppedTreatment[0].treatment.treatmentId)
            .to.equal(treatmentStopped.treatmentId);

          // saved treatments
          expect(data.savedTreatments).to.be.an('array');
          expect(data.savedTreatments).to.have.length.of(1);
          expect(data.savedTreatments[0].treatment.treatmentId)
            .to.equal(treatmentTrackedSaved.treatmentId);

          // problems
          expect(data.trackedProblems).to.be.an('array');
          expect(data.trackedProblems).to.have.length.of(2);

          var trackedProblem = _.where(data.trackedProblems, {status: 'tracking'});
          expect(trackedProblem).to.have.length.of(1);
          expect(trackedProblem[0].problem.problemId)
            .to.equal(problemTrackedSaved.problemId);

          expect(data.trackedProblems[0].status).to.equal("tracking");
          expect(data.trackedProblems[1].status).to.equal("stopped");

          expect(data.savedProblems).to.be.an('array');
          expect(data.savedProblems).to.have.length.of(1);
          
          done();
        }
      });
    })
  });
});
