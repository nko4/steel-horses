// https://github.com/nko4/website/blob/master/module/README.md#nodejs-knockout-deploy-check-ins
require('nko')('w0_XXuWDPdZYcRFP');

var express = require('express')
  ,  app = express()
  ,  http = require('http')
  ,  path = require('path')
  ,  mongoose = require('mongoose')
  ,  partials = require('express-partials')

// routes
var sessions = require('./routes/sessions');
var routes = require('./routes');

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.cookieParser('steelhorse@123#1'));
app.use(express.logger('dev'));
app.use(express.session());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.bodyParser());
app.use(app.router);
// development only
app.configure('development', function (){
    app.use( express.errorHandler({ dumpExceptions : true, showStack : true }));
});

mongoose.connect( 'mongodb://localhost:27017/steel_horses');

app.get('/', routes.index);
app.get('/sessions', sessions.index);
app.post('/sessions', sessions.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Go horses on ' + app.get('port'));
});
