/**
 * Youtube videos view
 * 
 */
define([
  'views/base',
  'views/youtube_video',
  'template',
  'lib/events'
], function(
  BaseView,
  YoutubeVideoView,
  template,
  global_events
) {
  
  return BaseView.extend({
    
    tagName: 'ul',

    events: {
    },

    initialize: function(opts) {
      this.$el.addClass('youtube-videos');
      this.listenTo(global_events, 'play-youtube-video', this.deselectAll);
    },
    
    render: function() {
      var obj = this;
      this.collection.forEach(function(model) {
        var video_view = new YoutubeVideoView({ model: model });
        obj.$el.append(video_view.render().el);
      });
      return this;
    },

    deselectAll: function() {
      this.$el.find('li.selected').removeClass('selected');
    }
  });
  
});
