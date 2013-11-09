var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    email: String,
    password: String,
    receivedFreeStickers: Boolean,
    stickers: Array,
    gluedStickers: Array
});


module.exports = mongoose.model('User', userSchema);

