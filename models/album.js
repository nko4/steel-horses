var AlbumPage = require('../models/album_page');
var Sticker = require('../models/sticker');

const AlbumDefaultWidth = 800;
const AlbumDefaultHeight = 600;

function Album(attributes) {
  this.pages = attributes.pages || [];
  this.name = attributes.name;
  this.namespace = attributes.namespace;
  this.width = attributes.width || AlbumDefaultWidth;
  this.height = attributes.height || AlbumDefaultHeight;
}

Album.init  = function() { return createDefaultAlbum(); };
Album.prototype.findStickerByNumber = function(number) {
  var stickers = this.getAllStickers();
  for(var i=0; i < stickers.length; i++) {
    if(stickers[i].number == number) { return stickers[i]; }
  }
  return null;
}

Album.prototype.getRandomSticker = function() {
  var stickers = this.getAllStickers();
  var index = Math.floor((Math.random()*stickers.length));
  return stickers[index];
}

Album.prototype.getAllStickers = function() {
  var stickers = []; 
  for(var i=0; i < this.pages.length; i++) {
    var page = this.pages[i];
    for(var j=0; j < page.stickers.length; j++) { 
      stickers.push(page.stickers[j]);
    }
  }
  return stickers;
};


function createDefaultAlbum() {

  stickersImagePath = '/images/stickers/default/';
  var pages = [];

  // MISS VAN
  var missVanPageOneStickers = [];
  var author = "Miss Van";
  missVanPageOneStickers.push(new Sticker({ author: author, x: 10, y: 10, image: stickersImagePath + 'miss-van-1.jpeg', number: 1, width: 180, height: 240}));
  missVanPageOneStickers.push(new Sticker({ author: author, x: 210, y: 10, image: stickersImagePath + 'miss-van-2.jpeg', number: 2, width: 180, height: 240}));
  missVanPageOneStickers.push(new Sticker({ author: author, x: 10, y: 283, image: stickersImagePath + 'miss-van-3.jpeg', number: 3, width: 373, height: 280}));

  var missVanPageTwoStickers = [];
  missVanPageTwoStickers.push(new Sticker({ author: author, x: 10, y: 10, image: stickersImagePath + 'miss-van-4.jpeg', number: 4, width: 373, height: 280}));
  missVanPageTwoStickers.push(new Sticker({ author: author, x: 10, y: 310, image: stickersImagePath + 'miss-van-5.jpeg', number: 5, width: 380, height: 252}));

  var missVanPageThreeStickers = [];
  missVanPageThreeStickers.push(new Sticker({ author: author, x: 10, y: 10, image: stickersImagePath + 'miss-van-6.jpeg', number: 6, width: 180, height: 270}));
  missVanPageThreeStickers.push(new Sticker({ author: author, x: 210, y: 50, image: stickersImagePath + 'miss-van-7.jpeg', number: 7, width: 180, height: 120}));
  missVanPageThreeStickers.push(new Sticker({ author: author, x: 10, y: 322, image: stickersImagePath + 'miss-van-8.jpeg', number: 8, width: 180, height: 240}));
  missVanPageThreeStickers.push(new Sticker({ author: author, x: 198, y: 282, image: stickersImagePath + 'miss-van-9.jpeg', number: 9, width: 191, height: 280}));

  pages.push(new AlbumPage({stickers: missVanPageOneStickers, number: 1, image: '/images/pages/default/miss-van.jpeg'}));
  pages.push(new AlbumPage({stickers: missVanPageTwoStickers, number: 2, image: '/images/pages/default/miss-van.jpeg'}));
  pages.push(new AlbumPage({stickers: missVanPageThreeStickers, number: 3, image: '/images/pages/default/miss-van.jpeg'}));


  // INVADER
  var author = "Invader";
  var invaderPageOneStickers = [];
  invaderPageOneStickers.push(new Sticker({ author: author, x: 10, y: 10, image: stickersImagePath + 'invader-1.jpeg', number: 10, width: 180, height: 135}));
  invaderPageOneStickers.push(new Sticker({ author: author, x: 210, y: 50, image: stickersImagePath + 'invader-2.jpeg', number: 11, width: 180, height: 135}));
  invaderPageOneStickers.push(new Sticker({ author: author, x: 10, y: 310, image: stickersImagePath + 'invader-3.jpeg', number: 12, width: 380, height: 214}));

  var invaderPageTwoStickers = [];
  invaderPageTwoStickers.push(new Sticker({ author: author, x: 210, y: 370, image: stickersImagePath + 'invader-4.jpeg', number: 14, width: 180, height: 135}));
  invaderPageTwoStickers.push(new Sticker({ author: author, x: 10, y: 330, image: stickersImagePath + 'invader-6.jpeg', number: 15, width: 180, height: 120}));
  invaderPageTwoStickers.push(new Sticker({ author: author, x: 5, y: 10, image: stickersImagePath + 'invader-5.jpeg', number: 13, width: 380, height: 264}));

  pages.push(new AlbumPage({stickers: invaderPageOneStickers, number: 4, image: '/images/pages/default/invader.jpeg'}));
  pages.push(new AlbumPage({stickers: invaderPageTwoStickers, number: 5, image: '/images/pages/default/invader.jpeg'}));

  // RON ENGLISH
  var author = "Ron English";
  var ronPageOneStickers = [];
  ronPageOneStickers.push(new Sticker({ author: author, x: 10, y: 10, image: stickersImagePath + 'ron-1.jpeg', number: 16, width: 380, height: 287}));
  ronPageOneStickers.push(new Sticker({ author: author, x: 10, y: 310, image: stickersImagePath + 'ron-2.jpeg', number: 17, width: 180, height: 255}));
  ronPageOneStickers.push(new Sticker({ author: author, x: 210, y: 310, image: stickersImagePath + 'ron-3.jpeg', number: 18, width: 180, height: 247}));
 
  var ronPageTwoStickers = [];
  ronPageTwoStickers.push(new Sticker({ author: author, x: 10, y: 10, image: stickersImagePath + 'ron-4.jpeg', number: 19, width: 380, height: 253}));
  ronPageTwoStickers.push(new Sticker({ author: author, x: 10, y: 310, image: stickersImagePath + 'ron-5.jpeg', number: 20, width: 380, height: 253}));
 
  var ronPageThreeStickers = [];
  ronPageThreeStickers.push(new Sticker({ author: author, x: 10, y: 10, image: stickersImagePath + 'ron-6.jpeg', number: 21, width: 180, height: 135}));
  ronPageThreeStickers.push(new Sticker({ author: author, x: 210, y: 10, image: stickersImagePath + 'ron-7.jpeg', number: 22, width: 180, height: 280}));
  ronPageThreeStickers.push(new Sticker({ author: author, x: 10, y: 310, image: stickersImagePath + 'ron-8.jpeg', number: 23, width: 180, height: 205}));
  ronPageThreeStickers.push(new Sticker({ author: author, x: 210, y: 310, image: stickersImagePath + 'ron-9.jpeg', number: 24, width: 180, height: 182}));

  pages.push(new AlbumPage({stickers: ronPageOneStickers, number: 6, image: '/images/pages/default/ron.jpeg'}));
  pages.push(new AlbumPage({stickers: ronPageTwoStickers, number: 7, image: '/images/pages/default/ron.jpeg'}));
  pages.push(new AlbumPage({stickers: ronPageThreeStickers, number: 8, image: '/images/pages/default/ron.jpeg'}));

  // BARRY MCGEE
  var author = "Barry McGee";
  var barryPageOneStickers = [];
  barryPageOneStickers.push(new Sticker({ author: author, x: 10, y: 10, image: stickersImagePath + 'barry-1.jpeg', number: 25, width: 380, height: 253}));
  barryPageOneStickers.push(new Sticker({ author: author, x: 20, y: 280, image: stickersImagePath + 'barry-2.jpeg', number: 26, width: 346, height: 300}));

  var barryPageTwoStickers = [];
  barryPageTwoStickers.push(new Sticker({ author: author, x: 10, y: 10, image: stickersImagePath + 'barry-3.jpeg', number: 27, width: 380, height: 254}));
  barryPageTwoStickers.push(new Sticker({ author: author, x: 10, y: 310, image: stickersImagePath + 'barry-4.jpeg', number: 28, width: 380, height: 254}));
  
  pages.push(new AlbumPage({stickers: barryPageOneStickers, number: 9, image: '/images/pages/default/barry.jpeg'}));
  pages.push(new AlbumPage({stickers: barryPageTwoStickers, number: 10, image: '/images/pages/default/barry.jpeg'}));

  // BLEK LE RAT
  var author = "Blek Le Rat";
  var ratPageOneStickers = [];
  ratPageOneStickers.push(new Sticker({ author: author, x: 10, y: 10, image: stickersImagePath + 'le-rat-1.jpeg', number: 30, width: 380, height: 253}));
  ratPageOneStickers.push(new Sticker({ author: author, x: 10, y: 310, image: stickersImagePath + 'le-rat-2.jpeg', number: 30, width: 380, height: 253}));
 
  var ratPageTwoStickers = [];
  ratPageTwoStickers.push(new Sticker({ author: author, x: 10, y: 100, image: stickersImagePath + 'le-rat-3.jpeg', number: 31, width: 180, height: 180}));
  ratPageTwoStickers.push(new Sticker({ author: author, x: 210, y: 10, image: stickersImagePath + 'le-rat-4.jpeg', number: 32, width: 180, height: 237}));
  ratPageTwoStickers.push(new Sticker({ author: author, x: 10, y: 310, image: stickersImagePath + 'le-rat-5.jpeg', number: 33, width: 180, height: 133}));
  ratPageTwoStickers.push(new Sticker({ author: author, x: 210, y: 320, image: stickersImagePath + 'le-rat-6.jpeg', number: 34, width: 180, height: 135}));

  var ratPageThreeStickers = [];
  ratPageThreeStickers.push(new Sticker({ author: author, x: 50, y: 15, image: stickersImagePath + 'le-rat-7.jpeg', number: 35, width: 287, height: 400}));

  pages.push(new AlbumPage({stickers: ratPageOneStickers, number: 11, image: '/images/pages/default/le-rat.jpeg'}));
  pages.push(new AlbumPage({stickers: ratPageTwoStickers, number: 12, image: '/images/pages/default/le-rat.jpeg'}));
  pages.push(new AlbumPage({stickers: ratPageThreeStickers, number: 13, image: '/images/pages/default/le-rat.jpeg'}));

  var album = new Album({pages: pages, name: 'Default', namespace: 'default', width: 800});
  return album;
}
module.exports = Album;
