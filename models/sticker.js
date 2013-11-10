const StickerDefaultHeight = 266;
const StickerDefaultWidth  = 161;

/*
 * x and y - where top left corner is (0,0)
 */
function Sticker(attributes) {
  this.width = attributes.width || StickerDefaultWidth;
  this.height = attributes.height || StickerDefaultHeight;
  this.image = attributes.image;
  this.x = attributes.x;
  this.y = attributes.y;
  this.number = attributes.number;
  this.author = attributes.author;
}

function tradeSticker(currentUser, user) {

}

module.exports = Sticker;
