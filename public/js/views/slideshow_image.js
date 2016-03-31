/**
 * Individual slideshow image
 * 
 */
define([
  'views/base',
  'template'
], function(
  BaseView,
  template
) {
  
  return BaseView.extend({
    
    events: {
    },

    initialize: function(opts) {
      this.model = opts.model;
    },
    
    render: function() {
      this.setElement(template.render('partials/slideshow_image', {
        product: this.model.toJSON() }));
      return this;
    }

  });
});

