/**
 * Index page view
 * 
 */
define([
  'views/base',
  'views/slideshow',
  'template'
], function(
  BaseView,
  SlideshowView,
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
        this.slideshow_view.setElement(this.$el.find('.slideshow-container'));
        this.slideshow_view.render();
        this.slideshow_view.listenTo(this.slideshow_view, 'ready',
          this.slideshow_view.start);
      } else {
        // Fresh load of entire page
        this.slideshow_view.setElement(this.$el.find('.slideshow-container'));
        this.slideshow_view.start();
      }
      return this;
    },

    onClose: function() {
      if (this.slideshow_view) {
        this.slideshow_view.close();
      }
    }

  });
});

