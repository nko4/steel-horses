// https://github.com/nko4/website/blob/master/module/README.md#nodejs-knockout-deploy-check-ins
require('nko')('w0_XXuWDPdZYcRFP');

var express = require('express')
  ,  app = express()
  ,  http = require('http')
  ,  server = http.createServer(app)
  ,  io = require('socket.io').listen(server)
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
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.session());
app.use(express.bodyParser());
app.use(app.router);
// development only
app.configure('development', function (){
    app.use( express.errorHandler({ dumpExceptions : true, showStack : true }));
});

mongoose.connect( 'mongodb://localhost:27017/steel_horses');

// Socket.io production config
io.configure('production', function(){
  io.enable('browser client minification');
  io.enable('browser client etag');
  io.enable('browser client gzip');
  io.set('log level', 1);
  io.set('transports', [
    'websocket'
    , 'flashsocket'
    , 'htmlfile'
    , 'xhr-polling'
    , 'jsonp-polling'
  ]);
});

io.sockets.on('connection',function(socket){
});

app.get('/', routes.index);
app.get('/sessions', sessions.index);
app.post('/sessions', sessions.create);

server.listen(app.get('port'));
