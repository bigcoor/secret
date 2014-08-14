var crypto    = require('crypto');

exports.uniqueString = function() { 
  return crypto.randomBytes(24).toString('hex'); 
}

exports.uniqueInteger = function() { 
  return parseInt(Math.random() * 100000000000); 
}

exports.registerData =  function() {
  return {
    "email"          : "471705753@qq.com",
    "firstName"      : "test",
    "password"       : "1.23456",
    "confirmPassword": "1.23456"
  }
}