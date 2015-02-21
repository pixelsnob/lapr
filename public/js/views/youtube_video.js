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
      'click a': 'showVideo'
    },

    initialize: function(opts) {
      this.setElement(template.render('partials/youtube_video', {
        video: this.model.toJSON()
      }));
    },
    
    render: function() {
      return this;
    },

    showVideo: function(ev) {
      if (this.$el.hasClass('selected')) {
        return false;
      }
      global_events.trigger('play-youtube-video', this.model);
      this.$el.addClass('selected');
      return false;
    }
  });
  
});
