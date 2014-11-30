var mongoose  = require('mongoose')
  , async     = require('async')
  , fs        = require('fs')

exports.data = {};

exports.load = function(collection, data, callback) {
  collection.create(data, callback);
};

exports.autoLoad = function(directory, callback) {
  var endsWithJs = /\.js$/;

  fs.readdir(directory, function(err, files) {
    
    async.each(files, function(file, callback) {
      if (endsWithJs.test(file)) {
        var modelName  = file.slice(0, -3)
          , model      = mongoose.model(modelName)
          , data       = require(directory + '/' + file)
        
        // console.log(data);
        model.create(data, function(err) {
          var argArray = _.toArray(arguments);
          if (argArray.length > 1) {
            exports.data[modelName] = argArray.slice(1, argArray.length1)
          }
          callback(err);
        })
      }
    }, callback);
  })
};

exports.reset = function(done) {  
  var db = mongoose.connection.db;

  var collections = ['users'];

  async.each(collections, function(name, cb) {
    mongoose.connection.collections[name].drop(function(err) {
      cb();
    });
  }, done);
};