exports.index = function(req, res){
  if(!req.session.user) {
    res.redirect('./login');
  }else{
    res.render('./index');
  }
};
