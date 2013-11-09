exports.index = function(req, res){
  res.render('./sessions/index');
};

exports.create = function(req, res){
  var User = require('../models/user.js');

  console.log(req);
  console.log(req.params);
  User.findOne({email: req.params.email, password: req.params.password}, function(error, user) {
    console.log(user);
  })
};
