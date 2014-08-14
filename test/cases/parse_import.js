var api               = require('../api_tester')
  , expect            = require('chai').expect
  , test_helper       = require('../test_helper')
  , async             = require("async")
  , TreatmentVote     = require('../../models/treatment_vote')
  , Problem           = require("../../models/problem")
  , TopicTrackHistory = require('../../models/topic_track_history')
  , JournalEntry      = require('../../models/journal_entry')
  , Symptom           = require("../../models/symptom")
  , Treatment         = require("../../models/treatment")

describe('Treatment', function() {
  it('converts parse data', function(done) {
    var data = {
      "brand_name": "Lopid",
      "category_name": "Cholesterol Medication",
      "description": "Gemfibrozil is used to lower cholesterol and triglyceride (fat-like substances) levels in the blood. This may help prevent medical problems caused by such substances clogging the blood vessels.",
      "description_source": "(Detailed Drug Information for the Consumer™. Truven Health Analytics. 2013)",
      "embedded_side_effects": [
        {"name":"Muscle pain","objectId":"JezHASpzcZ","occurrence":"Rare","serious":true,"severity":"See doctor"},
        {"name":"Unusual tiredness or weakness","objectId":"5rn4nUdC3B","occurrence":"Rare","serious":true,"severity":"See doctor"},
        {"name":"Stomach pain, gas, or heartburn","objectId":"gl5g3F3F9B","occurrence":"More common","serious":false,"severity":"No attention needed"}
      ],
      "generic_name": "Gemfibrozil",
      "healtho_score": 76,
      "icon": "pill",
      "icons": [
        "pill.png"
      ],
      "problem_id": "1imu16Qt8O",
      "problem_name": "High Cholesterol",
      "treatment_class_name": "Fibrate",
      "treatment_type_name": "From Your Doctor",
      "createdAt": "2013-05-02T20:28:21.128Z",
      "updatedAt": "2013-05-18T00:02:34.544Z",
      "objectId": "oOr99uD8ZR"
    };

    Treatment.createFromParseData(data, function(err, res) {
      expect(res.symptoms).to.have.length.of(3);
      expect(res.icons).to.have.length.of(1);
      // expect(res.problemId).to.not.equal(null);
      done();
    });
  });
});

// describe('User', function() {
//   it('converts parse data', function(done) {
//     var data = {
//       "name": "Rash",
//       "occurrence": 55,
//       "createdAt": "2013-05-02T20:26:27.650Z",
//       "updatedAt": "2013-05-02T20:26:27.650Z",
//       "objectId": "mAwqVdOBgJ"
//     };

//     Symptom.createFromParseData(data, function(err, res) {
//       expect(res.name).to.equal("Rash");
//       expect(res.occurrence).to.equal(55);
//       done();
//     });
//   });
// });

describe('Symptom', function() {
  it('converts parse data', function(done) {
    var data = {
      "name": "Rash",
      "occurrence": 55,
      "createdAt": "2013-05-02T20:26:27.650Z",
      "updatedAt": "2013-05-02T20:26:27.650Z",
      "objectId": "mAwqVdOBgJ"
    };

    Symptom.createFromParseData(data, function(err, res) {
      expect(res.name).to.equal("Rash");
      expect(res.occurrence).to.equal(55);
      done();
    });
  });
});

describe('JournalEntry', function() {
  it('converts parse data', function(done) {
    var data = {
      "journalText": "Hi",
      "feeling": 7,
      "userId": "GNmHJH6dpz",
      "selectedEffects": [
        {"name":"Mood changes","symptomId":"k7Y6kgYHnT"}
      ],
      "createdAt": "2013-05-11T06:08:59.960Z",
      "updatedAt": "2013-05-11T06:08:59.960Z",
      "objectId": "l58bsucUbC"
    };

    JournalEntry.createFromParseData(data, function(err, journalEntry) {
      expect(journalEntry.feeling).to.equal(data.feeling);
      expect(journalEntry.comment).to.equal(data.journalText);
      expect(journalEntry.symptoms).to.have.length.of(data.selectedEffects.length);
      done();
    });
  });
});

describe('TopicTrackHistory', function() {
  it('converts parse data', function(done) {
    var data = {
      "topicType": "Treatment",
      "userId": "pSOoSBnQEZ",
      "elements": [
        {"icons":["needle.png"],"journalDisplayName":"Acupuncture","problemId":"K7xfgV3NhG","problemName":"Allergies","treatmentId":"0wmMezrOr1","treatmentName":"Acupuncture","treatmentStatus":"tracking","treatmentType":"Alternative Procedure"},
        {"icons":["hand.png"],"journalDisplayName":"Nerve Gliding","problemId":"MDsmMTOo65","problemName":"Carpal Tunnel","treatmentId":"tPM4bEiH8Y","treatmentName":"Nerve Gliding","treatmentStatus":"tracking","treatmentType":"Alternative Procedure"},
        {"icons":["honey.png"],"journalDisplayName":"Honey","problemId":"9hFMF1pK54","problemName":"Throat Infection","treatmentId":"GKCSvWQZbV","treatmentName":"Honey","treatmentStatus":"tracking","treatmentType":"Home Remedy"},
        {"icons":["lemon.png"],"journalDisplayName":"Lemon","problemId":"9hFMF1pK54","problemName":"Throat Infection","treatmentId":"lFy9blzwnh","treatmentName":"Lemon","treatmentStatus":"tracking","treatmentType":"Home Remedy"},
        {"icons":["plant.png"],"journalDisplayName":"Echinacea","problemId":"YZKOah7tZc","problemName":"Common Cold","treatmentId":"WiiWPU7ECa","treatmentName":"Echinacea","treatmentStatus":"tracking","treatmentType":"Herbal Remedy"},
        {"icons":["honey.png"],"journalDisplayName":"Local Honey","problemId":"K7xfgV3NhG","problemName":"Allergies","treatmentId":"1ckniRbUjS","treatmentName":"Local Honey","treatmentStatus":"tracking","treatmentType":"Herbal Remedy"},
        {"icons":["nasalspray.png","tube.png"],"journalDisplayName":"Flonase","problemId":"K7xfgV3NhG","problemName":"Allergies","treatmentId":"GW7s1oGFJV","treatmentName":"Fluticasone","treatmentStatus":"tracking","treatmentType":"From Your Doctor"}
      ],
      "createdAt": "2013-05-09T21:33:00.805Z",
      "updatedAt": "2013-05-09T21:33:00.805Z",
      "objectId": "5LHQq0lV7W"
    };

    TopicTrackHistory.createFromParseData(data, function(err, topicTrackHistory) {
      expect(topicTrackHistory.topicType).to.equal(data.topicType);
      expect(topicTrackHistory.elements).to.have.length.of(data.elements.length);
      done();
    });
  });
});

describe('TreatmentVote', function() {
  it('coverts parse data', function(done) {
    var data = [{
      treatmentId: 'gRfMuE3Aec',
      userId: '7uqi5vrFsk',
      vote: true,
      createdAt: '2014-01-07T12:39:44.073Z',
      updatedAt: '2014-01-07T12:39:44.073Z',
      objectId: 'eyh8C1ugM2'
    }, {
      treatmentId: 'iRw36LRWOB',
      userId: '7uqi5vrFsk',
      vote: false,
      createdAt: '2014-01-07T12:41:24.201Z',
      updatedAt: '2014-01-07T12:41:24.201Z',
      objectId: 'c97ON5wut1'
    }, {
      treatmentId: '52bf09835068695fe0230200',
      userId: '7uqi5vrFsk',
      vote: false,
      createdAt: '2014-01-08T06:25:40.307Z',
      updatedAt: '2014-01-08T06:26:24.713Z',
      objectId: 'nPBQouZ21u'
    }];

    TreatmentVote.createFromParseData(data[0], function(err, treatmentVoteId) {
      TreatmentVote.findById(treatmentVoteId, function(err, treatmentVote) {
        expect(treatmentVote.vote).to.equal(true);
        expect(treatmentVote.parseId).to.equal('eyh8C1ugM2');
        done();
      });
    });
  });
});
