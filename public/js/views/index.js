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
      this.setElement(template.render('partials/index', { images: [] }));
    },
    
    render: function() {
      var slideshow_view = new SlideshowView({
        el: this.$el.find('.slideshow-container')
      });
      slideshow_view.render();
      return this;
    }

  });
});

