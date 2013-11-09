exports.index = function(req, res){
  res.render('./sessions/index');
};

exports.create = function(req, res){
  var User = require('../models/user.js');

  User.findOne({email: req.body.email, password: req.body.password}, function(error, user) {
    if(user) {
      req.session.user = user.email;
      res.render('index');
    }else{
      var user = new User({email: req.body.email, password: req.body.password});

      user.save(function (err) {
        if(!err) {
          req.session.user = user.email;
        }
      });

      res.render('index');
    };
  })
};
