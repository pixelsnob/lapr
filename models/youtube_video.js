
'use strict';

var db = require('mongoose');

var YoutubeVideoSchema = new db.Schema({
  name: { type: String, index: true, unique: true },
  size: Number,
  title: String
});

module.exports = function(mai) {
  YoutubeVideoSchema.plugin(mai.plugin, {
    model: 'YoutubeVideo',
    startAt: 1
  });
  return db.model('YoutubeVideo', YoutubeVideoSchema);
};


