/**
 * Supply an image to el and this will fade it in when the image has
 * loaded
 * 
 */
define([
  'views/base',
  'collections/loaded_images'
], function(
  BaseView,
  loaded_images_collection
) {
  
  return BaseView.extend({
    
    events: {
    },

    initialize: function(opts) {
      var obj = this;
      if (typeof opts.el != 'undefined' && $(opts.el).length) {
        this.setElement(opts.el);
        // Show if image has already been loaded, otherwise, fade in after load and
        // add to collection
        if (loaded_images_collection.findWhere({ src: this.$el.attr('src') })) {
          obj.$el.show();
        } else {
          var tmp_img = new Image;
          tmp_img.onload = function() {
            obj.$el.fadeIn(200);
            loaded_images_collection.add({ src: obj.$el.attr('src') });
          };
          tmp_img.src = this.$el.attr('src');
        }
      }
    },
    
    render: function() {
      return this;
    }

  });
});

