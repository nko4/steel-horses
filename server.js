// https://github.com/nko4/website/blob/master/module/README.md#nodejs-knockout-deploy-check-ins
require('nko')('w0_XXuWDPdZYcRFP');

var express = require('express'),
    app = express(),
    cons = require('consolidate'),
    crypto = require('crypto'),
    MongoClient = require('mongodb').MongoClient,
    http = require('http'),
    port = (isProduction ? 80 : 8000),
    isProduction = (process.env.NODE_ENV === 'production');

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://localhost:27017/steel_horses', function(err, db) {
  if(err) throw err;

  app.get('/', function(req, res){
    res.render('application');
  });


  app.get('*', function(req, res){
    return res.send('Page Not Found', 404);
  });

  app.listen(8080);
  console.log('Go horses on 8080');
});
