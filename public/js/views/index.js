/**
 * Index page view
 * 
 */
define([
  'views/base',
  'views/slideshow',
  'views/content_blocks',
  'template',
  'lib/events'
], function(
  BaseView,
  SlideshowView,
  content_blocks_view,
  template,
  global_events
) {
  
  return BaseView.extend({
    
    events: {
      'click .index-left img':  'navigateToFeaturedInstrument'
    },

    initialize: function(opts) {
      this.slideshow_view = new SlideshowView;
    },
    
    render: function() {
      this.setElement(template.render('partials/index', { images: [] }));
      content_blocks_view.setElement(this.$el).render();
      global_events.trigger('set-page-title', null);
      return this;
    },

    getSlideshowContainer: function() {
      return this.$el.find('.slideshow-container');
    },
    
    navigateToFeaturedInstrument: function(ev) {
      var url = '/instruments/MK-VII-88a-with-speaker-platform-rhodes/116';
      Backbone.history.navigate(url, true);
      return false;
    },
    
    onClose: function() {
      if (this.slideshow_view) {
        this.slideshow_view.close();
      }
    }

  });
});

