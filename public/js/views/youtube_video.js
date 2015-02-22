/**
 * Youtube video list item view
 * 
 */
define([
  'views/base',
  'template',
  'lib/events'
], function(
  BaseView,
  template,
  global_events
) {
  
  return BaseView.extend({
    
    events: {
      'click a':       'play',
      'mouseover a':   'showPreview',
      'mouseout a':    'hidePreview'
    },

    initialize: function(opts) {
      this.setElement(template.render('partials/youtube_video', {
        video: this.model.toJSON()
      }));
    },
    
    render: function() {
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

    showPreview: function(ev) {
      global_events.trigger('yt-show-preview', this.model);
      return false;
    },

    hidePreview: function(ev) {
      global_events.trigger('yt-hide-preview', this.model);
      return false;
    }
  });
  
});
