// https://github.com/nko4/website/blob/master/module/README.md#nodejs-knockout-deploy-check-ins
require('nko')('w0_XXuWDPdZYcRFP');

var express = require('express'),
    partials = require('express-partials'),
    app = express(),
    http = require('http'),
    MongoClient = require('mongodb').MongoClient,
    path = require('path');

// routes
var sessions = require('./routes/sessions');
var routes = require('./routes');

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.cookieParser('steelhorse@123#1'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

MongoClient.connect('mongodb://localhost:27017/steel_horses', function(err, db) {
  if(err) throw err;

  app.get('/', routes.index);
  app.get('/sessions', sessions.index);
  app.post('/sessions', sessions.index);

  http.createServer(app).listen(app.get('port'), function(){
    console.log('Go horses on ' + app.get('port'));
  });
});
