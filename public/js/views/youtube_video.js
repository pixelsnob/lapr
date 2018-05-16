/**
 * Youtube video list item view
 * 
 */
import BaseView from 'views/base';
import template from 'template';
import global_events from 'lib/events';

export default BaseView.extend({

  events: {
    'click a': 'play'
  },

  initialize: function(opts) {
    this.setElement(template.render('partials/youtube_video', {
      video: this.model.toJSON()
    }));
    this.listenTo(global_events, 'yt-stop', this.deselect);
  },

  render: function() {
    // Show only if video is available
    this.model.getPublishedVideos().then(videos => {
      if (videos.length) {
        this.$el.removeClass('hide');
      }
    });
    return this;
  },

  play: function(ev) {
    if (this.$el.hasClass('selected')) {
      return false;
    }
    global_events.trigger('yt-play', this.model);
    this.$el.addClass('selected');
    return false;
  },

  deselect: function() {
    this.$el.removeClass('selected');
  }

});
