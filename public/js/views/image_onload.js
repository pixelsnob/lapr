/**
 * Supply an image to el and this will fade it in when the image has
 * loaded
 * 
 */
define([
  'views/base'
], function(
  BaseView
) {
  
  return BaseView.extend({
    
    events: {
    },

    initialize: function(opts) {
      var obj = this;
      if (typeof opts.el != 'undefined' && $(opts.el).length) {
        this.setElement(opts.el);
        var tmp_img = new Image;
        tmp_img.onload = function() {
          obj.$el.fadeIn(200);
        };
        tmp_img.src = this.$el.attr('src');
      }
    },
    
    render: function() {
      return this;
    }

  });
});

