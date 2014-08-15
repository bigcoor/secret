var crypto    = require('crypto');

exports.uniqueString = function() { 
  return crypto.randomBytes(24).toString('hex'); 
};

exports.uniqueInteger = function() { 
  return parseInt(Math.random() * 100000000000); 
};