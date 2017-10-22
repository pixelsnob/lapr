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
      var obj = this;
      content_blocks_view.deferred.done(function() {
        obj.$featured_instrument = obj.$el.find('[data-name="index-left"] .content a[href^="/instruments"]');
        if (obj.$featured_instrument.length) {
          obj.featured_instrument_link = obj.$featured_instrument.attr('href');
          obj.$featured_instrument.attr('href', '');
        }
      });
      global_events.trigger('set-page-title', null);
      $(window).scrollTop(0);
      return this;
    },

    getSlideshowContainer: function() {
      return this.$el.find('.slideshow-container');
    },
    
    // Pick up instrument link from link in content, if any
    navigateToFeaturedInstrument: function(ev) {
      if (this.$featured_instrument.length && this.featured_instrument_link) {
        Backbone.history.navigate(this.featured_instrument_link, true);
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

