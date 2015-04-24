/**
 * Youtube video model
 * 
 */
define([
  './base'
], function(BaseModel) {
  return BaseModel.extend({
    
    url: function() { return '/api/youtube-videos/' + (this.id || '') },

    initialize: function(opts) {
      
    },

    toString: function() {
      return this.get('name');
    },

    // Used to check video availability
    getVideoJSON: function() {
      var yt_url = 'http://gdata.youtube.com/feeds/api/videos/' +
                    this.get('youtube_id') + '?v=2&alt=jsonc';
      return $.getJSON(yt_url);
    }

  });
});
