var api               = require('../api_tester')
  , test_helper       = require('../test_helper')
  , expect            = require('chai').expect
  , fixtures          = require('../../lib/fixtures')
  , underscore        = require('underscore')
  , async             = require('async')
  , TopicTrackHistory = require('../../models/topic_track_history')

var topicTrackHistory = {
  "createdAt": { "$date": 1367019627540 },
  "updatedAt": { "$date": 1394717866569 },
  "elements": [
    {
      "journalDisplayName": "Humira",
      "problemName": "Arthritis",
      "treatmentName": "Adalimumab",
      "treatmentStatus": "tracking",
      "treatmentType": "From Your Doctor",
      "problemId": '52d89fd8fd1b51de8c29213e',
      "treatmentId": '52d89fdbfd1b51de8c292edd',
      "icons": [
        "injection.png"
      ]
    }
  ],
  "topicType": "Treatment",
  "userId": '000000000000000000000001'
}

var seedData = function(callback) {
  TopicTrackHistory.create(topicTrackHistory, callback);
};

describe('journal', function() {  
  it('returns well formed data', function(done) {
    seedData(function(err, results) {
      api
      .get('/v1/journal/user/' + '000000000000000000000001')
      .setUser(fixtures.data['user_access_tokens'][0])
      .expect(200)
      .end(function(err, res) {
        console.log(res.body);
        expect(res.body).to.have.length(1);
        done();
      });
    });
  })
});