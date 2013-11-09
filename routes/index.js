var Album = require('../models/album');
var User = require('../models/user.js');

const FreeStickersCount = 5;

exports.index = function(req, res){
  if(!req.session.user || typeof(req.session.user) == 'undefined' || req.session.user == {}) {
    res.redirect('./sessions');
  }else{
    var album = Album.init();
    var currentUser = req.session.user;
    if(!currentUser.receivedFreeStickers) { giveBeginnersFreeStickers(currentUser, album); }
    res.render('index', { user: req.session.user, album: album });
  }
};

function giveBeginnersFreeStickers(currentUser, album) {
  for(var i=0; i< FreeStickersCount; i++) { 
    var sticker = album.getRandomSticker();
    currentUser.stickers.push(sticker.number);
  }
  currentUser.receivedFreeStickers = true;
  User.findOne({_id: currentUser._id}, function (err, user) {
    user.stickers = currentUser.stickers;
    user.receivedFreeStickers = true;
    user.save(function (err) {
      if(err) {
        console.error('ERROR!');
      }
    });
  });
}


