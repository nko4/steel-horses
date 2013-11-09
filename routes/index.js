var Album = require('../models/album');
var AlbumPage = require('../models/album_page');
var Sticker = require('../models/sticker');

exports.index = function(req, res){
  //if(!req.session.user) {
  //  res.redirect('./login');
  //}else{
    var currentAlbum = createDefaultAlbum();
    res.render('index', { title: currentAlbum.name, album: currentAlbum });
  //}
};

function createDefaultAlbum() {

  stickersImagePath = 'images/stickers/default/';
  var pages = [];

  // MISS VAN
  var missVanPageOneStickers = [];
  missVanPageOneStickers.push(new Sticker({ x: 10, y: 10, image: stickersImagePath + 'miss-van-1.jpeg', number: 1, width: 180, height: 240}));
  missVanPageOneStickers.push(new Sticker({ x: 210, y: 10, image: stickersImagePath + 'miss-van-2.jpeg', number: 2, width: 180, height: 240}));
  missVanPageOneStickers.push(new Sticker({ x: 10, y: 310, image: stickersImagePath + 'miss-van-3.jpeg', number: 3, width: 373, height: 280}));

  var missVanPageTwoStickers = [];
  missVanPageTwoStickers.push(new Sticker({ x: 10, y: 10, image: stickersImagePath + 'miss-van-4.jpeg', number: 4, width: 373, height: 280}));
  missVanPageTwoStickers.push(new Sticker({ x: 10, y: 310, image: stickersImagePath + 'miss-van-5.jpeg', number: 5, width: 380, height: 252}));

  var missVanPageThreeStickers = [];
  missVanPageThreeStickers.push(new Sticker({ x: 10, y: 10, image: stickersImagePath + 'miss-van-6.jpeg', number: 6, width: 180, height: 270}));
  missVanPageThreeStickers.push(new Sticker({ x: 210, y: 50, image: stickersImagePath + 'miss-van-7.jpeg', number: 7, width: 180, height: 120}));
  missVanPageThreeStickers.push(new Sticker({ x: 10, y: 330, image: stickersImagePath + 'miss-van-8.jpeg', number: 8, width: 180, height: 240}));
  missVanPageThreeStickers.push(new Sticker({ x: 205, y: 310, image: stickersImagePath + 'miss-van-9.jpeg', number: 9, width: 191, height: 280}));

  pages.push(new AlbumPage({stickers: missVanPageOneStickers, number: 1, image: 'images/pages/default/miss-van.jpeg'}));
  pages.push(new AlbumPage({stickers: missVanPageTwoStickers, number: 2, image: 'images/pages/default/miss-van.jpeg'}));
  pages.push(new AlbumPage({stickers: missVanPageThreeStickers, number: 3, image: 'images/pages/default/miss-van.jpeg'}));


  // INVADER
  var invaderPageOneStickers = [];
  invaderPageOneStickers.push(new Sticker({ x: 10, y: 10, image: stickersImagePath + 'invader-1.jpeg', number: 10, width: 180, height: 135}));
  invaderPageOneStickers.push(new Sticker({ x: 210, y: 50, image: stickersImagePath + 'invader-2.jpeg', number: 11, width: 180, height: 135}));
  invaderPageOneStickers.push(new Sticker({ x: 10, y: 310, image: stickersImagePath + 'invader-3.jpeg', number: 12, width: 380, height: 214}));

  var invaderPageTwoStickers = [];
  invaderPageTwoStickers.push(new Sticker({ x: 210, y: 370, image: stickersImagePath + 'invader-4.jpeg', number: 14, width: 180, height: 135}));
  invaderPageTwoStickers.push(new Sticker({ x: 10, y: 330, image: stickersImagePath + 'invader-6.jpeg', number: 15, width: 180, height: 120}));
  invaderPageTwoStickers.push(new Sticker({ x: 5, y: 10, image: stickersImagePath + 'invader-5.jpeg', number: 13, width: 380, height: 264}));

  pages.push(new AlbumPage({stickers: invaderPageOneStickers, number: 4, image: 'images/pages/default/invader.jpeg'}));
  pages.push(new AlbumPage({stickers: invaderPageTwoStickers, number: 5, image: 'images/pages/default/invader.jpeg'}));


  var album = new Album({pages: pages, name: 'Default', namespace: 'default', width: 800});
  return album;
}
