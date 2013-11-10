var Album = require('../models/album');
var User = require('../models/user.js');

exports.index = function(req, res){
  var userId = req.route.params.user_id;
  var album = Album.init();
  var currentUser = req.session.user;
  if(!req.session.user || typeof(req.session.user) == 'undefined' || req.session.user == {} || typeof(req.session.user.username) == 'undefined' ) {
    currentUser = {};
  }
  User.findOne({_id: userId}, function(error, fetchedUser) {
    if(!error) {
      res.render('./albums/index', {layout: false, currentUser: currentUser, user: fetchedUser, album: album});
    }
  });
};
