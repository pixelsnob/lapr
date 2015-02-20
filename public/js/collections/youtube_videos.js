/**
 * Youtube videos collection
 * 
 */
define([
  '../models/youtube_video'
], function(YoutubeVideoModel) {
  
  return Backbone.Collection.extend({
    
    url: '/api/youtube-videos',

    model: YoutubeVideoModel,

    comparator: 'name',

    initialize: function() {
    }
  });
});
