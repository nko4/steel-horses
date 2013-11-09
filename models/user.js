var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    username: String,
    password: String,
    receivedFreeStickers: Boolean,
    stickers: Array,
    gluedStickers: Array
});


module.exports = mongoose.model('User', userSchema);

