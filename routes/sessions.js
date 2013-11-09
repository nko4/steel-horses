exports.index = function(req, res){
  res.render('./sessions/index');
};

exports.create = function(req, res){
  var User = require('../models/user.js');

  console.log(req.params);
  console.log(req.body);
  User.findOne({email: req.params.email, password: req.params.password}, function(error, user) {
    if(user) {
      req.session.user = user.email;
    };
  })
};
