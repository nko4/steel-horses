// https://github.com/nko4/website/blob/master/module/README.md#nodejs-knockout-deploy-check-ins
require('nko')('w0_XXuWDPdZYcRFP');

var express = require('express')
  ,  app = express()
  ,  http = require('http')
  ,  isProduction = (process.env.NODE_ENV === 'production')
  ,  port = (isProduction ? 80 : 8080)
  ,  server = http.createServer(app).listen(port)
  ,  io = require('socket.io').listen(server)
  ,  path = require('path')
  ,  mongoose = require('mongoose')
  ,  partials = require('express-partials')

// routes
var sessions = require('./routes/sessions');
var albums = require('./routes/albums');
var routes = require('./routes');
var User = require('./models/user');
var Album = require('./models/album');

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

app.get('/', routes.index);
app.get('/sessions', sessions.index);
app.get('/albums/:user_id?', albums.index);
app.post('/sessions', sessions.create);

var clients = [];
var users = [];
var trades = [];

var album = Album.init();

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

  client.on('letsTradeSticker', function (data) {
    var usersToTrade = [];

    for(var i=0; i< users.length; i++) {
      var userToTrade = users[i];

      User.findOne({username: userToTrade.username}, function(error, user) {
        if(user && user.gluedStickers.indexOf(data.stickerNumber) == -1) {
          usersToTrade.push(user);
        }
      });
    }

//client.broadcast.emit('tryTradeSticker', data.userId, usersToTrade, data.stickerNumber);
  });

  client.on('startTrade', function (data) {
    var stickerNumber = data.stickerNumber;
    var userId = data.userId;
    User.where({gluedStickers: {'$ne': stickerNumber}}).exec(function(err, traders) { 
      var offerId = Math.floor(Math.random()*100001);
      var offeredSticker = album.findStickerByNumber(stickerNumber);
      User.findOne({_id: userId}, function (err, user) {
        if(!err) {
          var potentials = selectPotentialTraders(user, traders);
          if(potentials.length > 0) { trades.push(offerId); }
          else { client.emit("NoTraderWasFound", stickerNumber) }
          var notificationsSent = 0;
          for(var i=0; i<potentials.length; i++) {
            var suggestion = potentials[i];
            console.log(suggestion);
            var socket = findSocketForUserId(suggestion.traderId);
            if(socket) {
              var suggestedSticker = album.findStickerByNumber(suggestion.suggestedSticker);
              socket.emit("TradeRequest", {requesterId: userId, offerId: offerId, offeredSticker: offeredSticker,  suggestedSticker: suggestedSticker })
              notificationsSent++;
            }
          } 
          if(notificationsSent == 0){ client.emit("NoTraderWasFound", stickerNumber) }
        }else{
          client.emit("NoTraderWasFound", stickerNumber) 
        }
      });
    });
  });

  // data: {offerId: 1, xStickerNumber: x, xId: x, yStickerNumber: u, yId: yId}
  client.on('acceptedTrade', function (data) {
    console.log("come onnnnn" + data.offerId + " ---" + trades  );
    var go = false;
    for(var i=0; i<trades.length; i++){
      if(trades[i] == data.offerId) { go = true; break; }
    }
    if(go){
      sendSpecificSticker(data.xId, data.xStickerNumber);
      sendSpecificSticker(data.yId, data.yStickerNumber);
      var xSocket = findSocketForUserId(data.xId);
      var ySocket = findSocketForUserId(data.yId);
      if(xSocket) {
        xSocket.emit("TradeFinished", {remove: data.yStickerNumber, add: data.xStickerNumber});
      }
      if(ySocket) {
        ySocket.emit("TradeFinished", {add: data.yStickerNumber, remove: data.xStickerNumber});
      }
      client.broadcast.emit("DismissOffer", data.offerId);
    }else{
      client.emit("TradeExpired", data.yStickerNumber) 
    }
  });

  var countdown = 10;

  setInterval(function() {
    countdown--;

    if(countdown == 0){
      countdown = 10;
    }

    client.emit('timer', { countdown: countdown });
  }, 60000);
});

function findSocketForUserId(userId){
  for(var i=0; i<users.length; i++){
    if(("" + users[i].id) == (""+ userId)) {
      var user = users[i];
      for(var j=0; j<clients.length; j++){
        if(clients[j].id == user.socket){
          return clients[j];
        }
      }
    }
  }
  return null;
}

// Select users that has something to offer to user.
// {traderId: mongo-id, suggestedSticker: trade suggestion}
function selectPotentialTraders(user, traders) {
  var allStickers =  album.getAllStickersNumbers();
  var alreadyHave = user.gluedStickers;
  var needed = arr_diff(allStickers, alreadyHave);
  var offers = [];
  for(var j=0; j<traders.length; j++) {
    if(("" + traders[j]._id) != ("" + user._id)) {
      for(var i=0;i<needed.length; i++){
        if(traders[j].stickers.indexOf(needed[i]) != -1){
          var suggestion = {traderId: traders[j]._id, suggestedSticker: needed[i]};
          offers.push(suggestion);
          break;
        }
      }
    }
  }
  return offers;
}

function arr_diff(a1, a2)
{
  var a=[], diff=[];
  for(var i=0;i<a1.length;i++)
    a[a1[i]]=true;
  for(var i=0;i<a2.length;i++)
    if(a[a2[i]]) delete a[a2[i]];
    else a[a2[i]]=true;
  for(var k in a)
    diff.push(k);
  return diff;
}

function sendSticker(userId) {
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


function sendSpecificSticker(userId,stickerNumber) {
  User.findOne({_id: userId}, function (err, user) {
    user.stickers.push(stickerNumber);
    user.save(function (err) {
      if(err) {
        console.error('ERROR!');
      } else {
        console.log("Sticker from trade!");
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


