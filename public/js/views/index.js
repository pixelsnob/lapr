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
      'click .index-left .content img':  'navigateToFeaturedInstrument',
      'click .index-left .content a':  'navigateToFeaturedInstrument'
    },

    initialize: function(opts) {
      this.slideshow_view = new SlideshowView;
    },
    
    render: function() {
      this.setElement(template.render('partials/index', { images: [] }));
      content_blocks_view.setElement(this.$el).render();
      global_events.trigger('set-page-title', null);
      $(window).scrollTop(0);
      return this;
    },

    getSlideshowContainer: function() {
      return this.$el.find('.slideshow-container');
    },
    
    // Pick up instrument link from link in content, if any
    navigateToFeaturedInstrument: function(ev) {
      var $featured = $('[data-name="index-left"] .content a[href^="/instruments"]');
      if ($featured.length) {
        var url = $featured.attr('href');
        if (url) {
          Backbone.history.navigate(url, true);
        }
      }
      return false;
    },
    
    onClose: function() {
      if (this.slideshow_view) {
        this.slideshow_view.close();
      }
    }

  });
});

