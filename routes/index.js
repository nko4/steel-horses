var Album = require('../models/album');

exports.index = function(req, res){
  if(!req.session.user || typeof(req.session.user) == 'undefined' || req.session.user == {}) {
    res.redirect('./sessions');
  }else{
    var album = Album.init();
    res.render('index', { user: req.session.user, album: album });
  }
};


