var api         = require('../api_tester')
  , expect      = require('chai').expect
  , test_helper = require('../test_helper');
  
describe('post an email to get notified', function() {
  it('errors when saving email', function(done) {
    api
    .post('/notified.json')
    .send({ useremail : 'test@bigcoor.com'})
    .expect(400, done);
  });
});