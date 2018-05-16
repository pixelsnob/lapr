/**
 * Youtube videos view
 * 
 */
import BaseView from 'views/base';
import YoutubeVideoView from 'views/youtube_video';
import template from 'template';
import global_events from 'lib/events';

export default BaseView.extend({

  tagName: 'ul',

  events: {},

  initialize: function(opts) {
    this.$el.addClass('youtube-videos');
    this.listenTo(global_events, 'yt-play yt-stop', this.deselectAll);
    this.listenTo(global_events, 'yt-error', this.playerError);
  },

  render: function() {
    this.collection.forEach(model => {
      var video_view = new YoutubeVideoView({
        model: model
      });
      this.$el.append(video_view.render().el);
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
    this.collection.forEach(model => {
      this.$el.find('li[data-id=' + model.id + ']:not([data-id=' + selected_model.id + '])').hide();
    });
  }
});
