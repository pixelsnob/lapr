
'use strict';

var db = require('mongoose');

var YoutubeVideoSchema = new db.Schema({
  name: { type: String, index: true, unique: true, required: true },
  youtube_id: { type: String, index: true, unique: true, required: true },
  start_time: { type: Number },
  description: { type: String }
}, { collection: 'youtube_videos' });

module.exports = function(mai) {
  YoutubeVideoSchema.plugin(mai.plugin, {
    model: 'YoutubeVideo',
    startAt: 1
  });
  return db.model('YoutubeVideo', YoutubeVideoSchema);
};


