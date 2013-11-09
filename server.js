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
var albums = require('./routes/albums');
var routes = require('./routes');
var User = require('./models/user');

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

server.listen(app.get('port'));

app.get('/', routes.index);
app.get('/sessions', sessions.index);
app.get('/albums/:user_id?', albums.index);
app.post('/sessions', sessions.create);

var clients = [];

io.sockets.on('connection', function(client){
  clients.push(client);

  client.on('disconnect', function() {
    clients.splice(clients.indexOf(client), 1);
  });

  client.on('userGluedSticker', function (data) {
    console.log("Gluing sticker " + data.stickerNumber + " to " + data.userId);
    glueSticker(data.userId, data.stickerNumber);
  });

  client.on('userReceivedSticker', function (data) {
    console.log("Giving sticker " + data.stickerNumber + " to " + data.userId);
  });

  client.on('itsTimeToSendSticker', function (data) {
    console.log("Sending a new sticker");
    sendSticker(data.userId);
  });
});

function sendSticker(userId) {
  var Album = require('./models/album');
  var album = Album.init();
  var sticker = album.getRandomSticker();

  User.findOne({_id: userId}, function (err, user) {
    user.stickers.push(sticker.number);

    user.stickers = user.stickers;

    user.save(function (err) {
      if(err) {
        console.error('ERROR!');
      } else {
        console.log("A new sticker has arrived!");
      }
    });
  });
}

function glueSticker(userId, stickerNumber) {
  User.findOne({_id: userId}, function (err, user) {
    console.log(stickerNumber);
    user.gluedStickers.push(stickerNumber);
    var i = user.stickers.indexOf(stickerNumber);
    if(i != -1) { user.stickers.splice(i, 1); }

    user.save(function (err) {
      if(err) {
        console.error('ERROR!');
      }
    });
  });
}


