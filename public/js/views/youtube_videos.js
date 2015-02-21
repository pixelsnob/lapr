/**
 * Youtube videos view
 * 
 */
define([
  'views/base',
  'views/youtube_video',
  'template'
], function(
  BaseView,
  YoutubeVideoView,
  template
) {
  
  return BaseView.extend({
    
    tagName: 'ul',

    events: {
    },

    initialize: function(opts) {
      this.$el.addClass('youtube-videos');
    },
    
    render: function() {
      var obj = this;
      this.collection.forEach(function(model) {
        var video_view = new YoutubeVideoView({ model: model });
        obj.$el.append(video_view.render().el);
      });
      return this;
    }
  });
  
});
