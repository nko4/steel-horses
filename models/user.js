var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    email: String,
    password: String,
    receivedFreeStickers: Boolean
});

module.exports = mongoose.model('User', userSchema);
