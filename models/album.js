const AlbumDefaultWidth = 800;
const AlbumDefaultHeight = 600;

function Album(attributes) {
  this.pages = attributes.pages || [];
  this.name = attributes.name;
  this.namespace = attributes.namespace;
  this.width = attributes.width || AlbumDefaultWidth;
  this.height = attributes.height || AlbumDefaultHeight;
}

Album.prototype.findStickerByNumber = function(number) {
  var stickers = this.getAllStickers();
  for(var i=0; i < stickers.length; i++) {
    if(stickers[i].number == number) { return stickers[i]; }
  }
  return null;
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

module.exports = Album;
