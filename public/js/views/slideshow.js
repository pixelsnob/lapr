/**
 * Simple slideshow functionality: transitions and animations in CSS
 * 
 */
define([
  'views/base',
  'views/slideshow_image',
  'collections/slideshow_images',
  'template'
], function(
  BaseView,
  SlideshowImageView,
  SlideshowImagesCollection,
  template
) {
  
  return BaseView.extend({
    
    interval_id: null,

    events: {
    },

    initialize: function(opts) {
      this.collection = new SlideshowImagesCollection;
    },
    
    render: function() {
      var obj = this;
      this.collection.fetch().done(function(images) {
        _.each(obj.collection.models, function(image) {
          var view = new SlideshowImageView({ model: image });
          obj.$el.find('.slideshow').append(view.render().el);
        });
        obj.trigger('ready');
      });
      return this;
    },
    
    start: function() {
      var obj = this;
      this.preload(function() {
        obj.setFirst();
        obj.interval_id = setInterval(_.bind(obj.setNext, obj), 5000);
      });
    },
    
    preload: function(cb) {
      var $images = this.$el.find('img'),
          obj     = this,
          c       = 0;
      $images.each(function(i) {
        var image = new Image;
        image.src = $(this).attr('src');
        image.onload = function() {
          c++;
          if (c == $images.length) {
            cb();
          }
        };
      });
    },

    setCurrent: function($el) {
      this.$el.find('.current').removeClass('current');
      $el.addClass('current');
    },
    
    setFirst: function() {
      this.setCurrent(this.$el.find('li:first'));
    },
    
    setNext: function() {
      console.log('setnext');
      var next = this.$el.find('.current').next();
      if (next.length) {
        this.setCurrent(next);
      } else {
        this.setFirst();
      }
    },

    onClose: function() {
      clearInterval(this.interval_id);
      this.collection.unbind();
    }

  });
});

