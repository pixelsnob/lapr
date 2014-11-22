/**
 * Playlist item (video or audio) model
 * 
 */
define([
  './base'
], function(BaseModel) {
  var PlaylistItemModel = BaseModel.extend({
    
    getMeta: function() {
      var obj = this, out;
      _.each(PlaylistItemModel.meta, function(meta) {
        if (meta.url_regex.test(obj.get('src'))) {
          out = meta;
          return false;
        }
      });
      return out;
    }
  });

  PlaylistItemModel.meta = {
    mp3: {
      media_type:   'audio',
      player:       'jplayer',
      jplayer_type: 'mp3',
      sel:          'a[href$=".mp3"]',
      url_regex:    /\.mp3$/
    },
    youtube: {
      media_type:   'video',
      player:       'youtube',
      sel:          'a[href*="youtube.com"]',
      url_regex:    /youtube\.com/
    }
  };

  return PlaylistItemModel;
});

