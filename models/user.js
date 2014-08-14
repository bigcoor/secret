var mongoose    = require('mongoose')
  , modelPlugin = require('../lib/model_plugin');

require('mongoose-long')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
var Schema = mongoose.Schema;

var User = new Schema({
  email : { type: String, unique: true }
});

User.plugin(modelPlugin);

module.exports = mongoose.model('users', User);