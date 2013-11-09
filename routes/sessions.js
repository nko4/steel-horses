exports.index = function(req, res){
  req.session.user = {};
  res.render('./sessions/index', {user: req.session.user});
};

exports.create = function(req, res){
  var User = require('../models/user.js');

  User.findOne({email: req.body.email, password: req.body.password}, function(error, user) {
    if(user) {
      req.session.user = user;
      res.redirect('/');
    }else{
      var user = new User({email: req.body.email, password: req.body.password});
      user.receivedFreeStickers = false;
      user.save(function (err) {
        if(!err) {
          req.session.user = user;
        }
      });

      res.redirect('/');
    };
  })
};
