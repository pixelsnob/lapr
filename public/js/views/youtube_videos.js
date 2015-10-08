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
      this.listenTo(global_events, 'yt-play yt-stop', this.deselectAll);
      this.listenTo(global_events, 'yt-play', this.hideUnselected);
      this.listenTo(global_events, 'yt-error', this.playerError);
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
      this.$el.find('li').show();
    },

    playerError: function(model) {
      this.$el.find('li').show();
      this.$el.find('li[data-id=' + model.id + ']').hide();
    },

    hideUnselected: function(selected_model) {
      var obj = this;
      this.collection.forEach(function(model) {
        obj.$el.find('li[data-id=' + model.id + ']:not([data-id=' + selected_model.id + '])').hide();
      });
    }
  });
  
});
