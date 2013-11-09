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

  var album = new Album({pages: pages, name: 'Default', namespace: 'default', width: 800});
  return album;
}
