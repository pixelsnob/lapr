
'use strict';

var db = require('mongoose');

var ImageSchema = new db.Schema({
  filename: String,
  size: Number,
  title: String
});

module.exports = function(mai) {
  ImageSchema.plugin(mai.plugin, {
    model: 'Image',
    startAt: 1
  });
  return db.model('Image', ImageSchema);
};


