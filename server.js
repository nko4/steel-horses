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
var users = [];

io.sockets.on('connection', function(client){
  clients.push(client);

  client.on('disconnect', function() {
    clients.splice(clients.indexOf(client), 1);
    for(var i=0; i< users.length; i++){
      if(users[i].socket == client.id) {
        users.splice(i, 1);
        return;
      }
    }
    client.broadcast.emit("allUsers", users);
  });

  client.on('userConnected', function (user) {
    for(var i=0; i< users.length; i++){
      if(users[i].id == user.id) {
        return;
      }
    }
    user.socket = client.id;
    users.push(user);
    client.broadcast.emit("allUsers", users);
  });

  client.on('getAllUsers', function () {
    client.emit("allUsers", users);
  });

  client.on('userGluedSticker', function (data) {
    console.log("Gluing sticker " + data.stickerNumber + " to " + data.userId);
    glueSticker(data.userId, data.stickerNumber);
  });

  client.on('itsTimeToSendSticker', function (data) {
    var sticker = sendSticker(data.userId);
    client.emit("receivedNewSticker", sticker);
  });

  var countdown = 10;

  setInterval(function() {
    countdown--;
    client.emit('timer', { countdown: countdown });
  }, 60000);
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
  return sticker;
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


