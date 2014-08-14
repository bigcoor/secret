var api         = require('../api_tester')
  , expect      = require('chai').expect
  , async     = require('async')
  , test_helper = require('../test_helper');
  
describe('/users/fbLogin', function() {
  it('errors when facebookAccessToken or facebookId are not provided', function(done) {
    api
    .post('/v1/users/fbLogin')
    .expect(400, done)
  });

  // it('errors when access token rejected by Facebook API', function(done) {
  //   api
  //   .post('/v1/users/fbLogin')
  //   .send({"facebookAccessToken": "bogus token", "facebookId": "bogus id"})
  //   .expect(400, {error: "invalid fb credentials"}, done)
  // });

  it('errors when facebookId is linked to another user', function(done) {
    var facebookId = test_helper.uniqueInteger();

    // create a fb user
    api
    .post('/v1/users/fbLogin')
    .send({"facebookAccessToken": "a token", "facebookId": facebookId})
    .end(function(err, res) {
      // create an anon user
      api
      .post('/v1/users/skipLogin')
      .end(function(err, res) {
        api
        .post('/v1/users/fbLogin')
        .set("userId", res.body.userId)
        .set("token", res.body.token)
        .send({"facebookAccessToken": "a token", "facebookId": facebookId})
        .expect(400, {"error": "User with facebookId already exists"}, done)
      });
    });
  });

  it('saves FacebookId and token', function(done) {
    var facebookId          = test_helper.uniqueInteger()
      , facebookAccessToken = test_helper.uniqueString();

    api
    .post('/v1/users/fbLogin')
    .send({"facebookAccessToken": facebookAccessToken, "facebookId": facebookId})
    .expect(200)
    .end(function(err, res) {
      if (err) done(err);

      api
      .get('/v1/users/' + res.body.userId)
      .end(function(err, res) {
        expect(parseInt(res.body.facebookId)).to.equal(facebookId);
        expect(res.body.facebookAccessToken).to.equal(facebookAccessToken);
        done();
      });
    });

  });

  it('converts user when UserId and token are valid', function(done) {
    var facebookId          = test_helper.uniqueInteger()
      , facebookAccessToken = test_helper.uniqueString();

    api
    .post('/v1/users/skipLogin')
    .send({userName: "bob"})
    .expect(200)
    .end(function(err, res) {
      if (err) done(err);

      var userId  = res.body.userId;
      var token   = res.body.token;

      api
      .get('/v1/users/' + userId)
      .end(function(err, res) {
        if (err) done(err);
        
        expect(res.body.userName).to.equal("bob");

        api
        .post('/v1/users/fbLogin')
        .set("userId", userId)
        .set("token", token)
        .send({
          "facebookAccessToken": facebookAccessToken, 
          "facebookId": facebookId,
          "userName": "new bob"
        })
        .expect(200)
        .end(function(err, res) {
          if (err) done(err);

          api
          .get('/v1/users/' + userId)
          .expect(200)
          .end(function(err, res) {
            if (err) done(err);

            expect(parseInt(res.body.facebookId)).to.equal(facebookId); 
            expect(res.body.facebookAccessToken).to.equal(facebookAccessToken);
            expect(res.body.userName).to.equal("new bob");

            done();
          });
        });
      });
    });
  });
});

describe("/users/emailRegister", function() {

  it("can register a new user with email and login", function(done) {
    var registerData = test_helper.registerData();
    api
    .post('/v1/users/emailRegister')
    .send( registerData )
    .expect(200)
    .end( function(err, res) {
      if (err) done(err);
      
      api
      .get('/v1/users/' + res.body.userId)
      .expect(200)
      .end(function(err, res) {
        if (err) done(err);
        
        expect(res.body.email).to.equal(registerData.email);
        expect(res.body.firstName).to.equal(registerData.firstName);
        
        api
        .post('/v1/users/emailLogin')
        .send(registerData)
        .expect(200)
        .end(function(err, res) {
          if(err) done(err);
  
          expect(res.body).to.not.have.key('error');
          done();
        })
      });
    });
  });

  it("apply for reset password and reset with email registered", function(done) {
    api
    .post('/v1/users/resetPassword')
    .send({"email": "test@cur.es"})
    .expect(200)
    .end(function(err, res) {
      if(err) done(err);
      expect(res.body.code.length).to.be.above(2);
      api
      .post('/v1/resetPassword/resetPasswordDone')
      .send({newPassword: "123456", confirmPassword: "123456", code: res.body.code})
      .expect(200)
      .end(function(err, res){
        if(err) done(err);
        
        expect(res.body).to.not.have.keys(['err', 'error']);
        done();
      })

      //done();
    })
  });
});