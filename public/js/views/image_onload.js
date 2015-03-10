/**
 * Adds an image and fades it in once it has loaded
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
      this.src = opts.src;
      this.setElement(opts.el);
      if (this.src) {
        if (loaded_images_collection.findWhere({ src: this.src })) {
          this.render();
          this.$el.find('img').fadeIn(1000);
          this.trigger('loaded');
        } else {
          var tmp_img = new Image;
          tmp_img.onload = function() {
            obj.render();
            obj.$el.find('img').fadeIn(1000);
            loaded_images_collection.add({ src: obj.src });
            obj.trigger('loaded');
          };
          tmp_img.src = this.src;
        }
      }
    },
    
    render: function() {
      this.$el.html($('<img>').attr('src', this.src));
      return this;
    }

  });
});

