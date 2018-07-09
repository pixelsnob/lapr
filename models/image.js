
'use strict';

var db = require('mongoose');

var ImageSchema = new db.Schema({
  name: { type: String, index: true, unique: true },
  size: Number,
  title: String,
  width: Number,
  height: Number,
  inline_crop: String,
  inline_crop_blur: String
});

ImageSchema.pre('remove', function(next) {
  db.model('Product').update(
    { images: this._id },
    { $pull: { images: this._id }},
    { multi: true },
    next
  );
});

module.exports = mai => {
  ImageSchema.plugin(mai.plugin, {
    model: 'Image',
    startAt: 1
  });
  return db.model('Image', ImageSchema);
};


