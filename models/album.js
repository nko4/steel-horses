const AlbumDefaultWidth = 800;
const AlbumDefaultHeight = 600;

function Album(attributes) {
  this.pages = attributes.pages || [];
  this.name = attributes.name;
  this.namespace = attributes.namespace;
  this.width = attributes.width || AlbumDefaultWidth;
  this.height = attributes.height || AlbumDefaultHeight;
}

module.exports = Album;
