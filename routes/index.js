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
  missVanPageOneStickers.push(new Sticker({ x: 10, y: 10, image: stickersImagePath + 'miss-van-1.jpeg', number: 1, width: 1, height: 1}));
  missVanPageOneStickers.push(new Sticker({ x: 10, y: 10, image: stickersImagePath + 'miss-van-2.jpeg', number: 2, width: 1, height: 1}));
  missVanPageOneStickers.push(new Sticker({ x: 10, y: 10, image: stickersImagePath + 'miss-van-3.jpeg', number: 3, width: 1, height: 1}));

  var missVanPageTwoStickers = [];
  missVanPageTwoStickers.push(new Sticker({ x: 10, y: 10, image: stickersImagePath + 'miss-van-4.jpeg', number: 4, width: 1, height: 1}));
  missVanPageOneStickers.push(new Sticker({ x: 10, y: 10, image: stickersImagePath + 'miss-van-5.jpeg', number: 5, width: 1, height: 1}));

  var missVanPageThreeStickers = [];
  missVanPageThreeStickers.push(new Sticker({ x: 10, y: 10, image: stickersImagePath + 'miss-van-6.jpeg', number: 6, width: 1, height: 1}));
  missVanPageThreeStickers.push(new Sticker({ x: 10, y: 10, image: stickersImagePath + 'miss-van-7.jpeg', number: 7, width: 1, height: 1}));
  missVanPageThreeStickers.push(new Sticker({ x: 10, y: 10, image: stickersImagePath + 'miss-van-8.jpeg', number: 8, width: 1, height: 1}));
  missVanPageThreeStickers.push(new Sticker({ x: 10, y: 10, image: stickersImagePath + 'miss-van-9.jpeg', number: 9, width: 1, height: 1}));

  pages.push(new AlbumPage({stickers: missVanPageOneStickers, number: 1, image: 'images/pages/default/miss-van.jpeg'}));
  pages.push(new AlbumPage({stickers: missVanPageTwoStickers, number: 2, image: 'images/pages/default/miss-van.jpeg'}));
  pages.push(new AlbumPage({stickers: missVanPageThreeStickers, number: 3, image: 'images/pages/default/miss-van.jpeg'}));

  var album = new Album({pages: pages, name: 'Default', namespace: 'default', width: 800});
  return album;
}
