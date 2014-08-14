var User = require('../../models/user');

exports.index = function(req, res) {
  res.render('index');
};

exports.notified = function(req, res) {
  var email = req.body.userEmail;
  if (email) {
    User.create({ email : email}, function(err, user) {
      res.json({
        error : err
      , data  : user });
    });
  }
};