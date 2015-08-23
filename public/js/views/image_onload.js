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
      this.src = opts.src;
      this.setElement(opts.el);
    },

    render: function() {
      var obj = this;
      if (this.src) {
        if (loaded_images_collection.findWhere({ src: this.src })) {
          this.renderImg();
          this.show(0);
          this.trigger('loaded');
        } else {
          var tmp_img = new Image;
          tmp_img.onload = function() {
            obj.renderImg();
            obj.show(500);
            loaded_images_collection.add({ src: obj.src });
            obj.trigger('loaded');
          };
          tmp_img.src = this.src;
        }
      }
    },
    
    renderImg: function() {
      this.$el.html($('<img>').attr('src', this.src));
      return this;
    },

    show: function(t) {
      //var delay = Math.round(Math.random() * 500);
      this.$el.find('img').fadeIn(t);
    }

  });
});

