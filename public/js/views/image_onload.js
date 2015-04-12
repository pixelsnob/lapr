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
      this.maxHeight = opts.maxHeight;
      this.setElement(opts.el);
      if (this.src) {
        if (loaded_images_collection.findWhere({ src: this.src })) {
          this.render();
          this.show();
          this.trigger('loaded');
        } else {
          var tmp_img = new Image;
          tmp_img.onload = function() {
            obj.render();
            obj.show();
            loaded_images_collection.add({ src: obj.src });
            obj.trigger('loaded');
          };
          tmp_img.src = this.src;
        }
      }
    },
    
    render: function() {
      this.$el.html($('<img>').attr('src', this.src));
      if (this.maxHeight) {
        //this.$el.find('img').css({ maxHeight: this.maxHeight });
      }
      return this;
    },

    show: function() {
      var delay = Math.round(Math.random() * 500);
      this.$el.find('img').delay(Math.round(Math.random() * 500)).fadeIn(1000);
    }

  });
});

