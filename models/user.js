var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    name: String,
    email: String
});

module.exports = mongoose.model('User', userSchema);
