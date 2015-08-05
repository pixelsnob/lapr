/**
 * Index page view
 * 
 */
define([
  'views/base',
  'views/slideshow',
  'views/content_blocks',
  'template'
], function(
  BaseView,
  SlideshowView,
  content_blocks_view,
  template
) {
  
  return BaseView.extend({
    
    events: {
    },

    initialize: function(opts) {
      this.slideshow_view = new SlideshowView;
    },
    
    render: function() {
      if (!this.$el.find('.index').length) {
        // Loaded dynamically
        this.setElement(template.render('partials/index', { images: [] }));
        this.slideshow_view.setElement(this.getSlideshowContainer());
        this.slideshow_view.render();
        this.slideshow_view.listenTo(this.slideshow_view, 'ready',
          this.slideshow_view.start);
      } else {
        // Fresh load of entire page
        this.slideshow_view.setElement(this.getSlideshowContainer());
        this.slideshow_view.start();
      }
      content_blocks_view.setElement(this.$el).render();
      return this;
    },

    getSlideshowContainer: function() {
      return this.$el.find('.slideshow-container');
    },

    onClose: function() {
      if (this.slideshow_view) {
        this.slideshow_view.close();
      }
    }

  });
});

