exports.index = function(req, res){
  req.session.user = {};
  res.render('./sessions/index', {currentUser: req.session.user, user: req.session.user, album: {}});
};

exports.create = function(req, res){
  var User = require('../models/user.js');

  User.findOne({username: req.body.username, password: req.body.password}, function(error, user) {
    if(user) {
      req.session.user = user;
      res.redirect('/');
    }else{
      var user = new User({username: req.body.username, password: req.body.password});
      user.receivedFreeStickers = false;
      user.save(function (err) {
        if(!err) {
          req.session.user = user;
          res.redirect('/');
        }
      });
    };
  })
};
