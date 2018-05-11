/**
 * Adds an image and fades it in once it has loaded
 * 
 */
import BaseView from 'views/base';
import loaded_images_collection from 'collections/loaded_images';

export default BaseView.extend({

  events: {},

  initialize: function(opts) {
    this.src = opts.src;
    this.setElement(opts.el);
    this.random_delay = opts.random_delay;
  },

  triggerLoaded: function() {
    this.trigger('loaded', this.img_width, this.img_height);
  },

  render: function() {
    var obj = this;
    if (this.src) {
      if (loaded_images_collection.findWhere({
          src: this.src
        })) {
        this.renderImg();
        this.show(0);
        this.triggerLoaded();
      } else {
        var tmp_img = new Image;
        tmp_img.onload = function() {
          obj.renderImg();
          obj.show(0);
          loaded_images_collection.add({
            src: obj.src
          });
          obj.triggerLoaded();
        };
        tmp_img.src = this.src;
      }
    }
  },

  renderImg: function() {
    var $img = $('<img>').attr('src', this.src);
    this.$el.html($img);
    this.img_width = $img.get(0).naturalWidth;
    this.img_height = $img.get(0).naturalHeight;
    return this;
  },

  show: function(t) {
    var obj = this;
    var fadeIn = function() {
      obj.$el.find('img').fadeIn(t);
    };
    // Stagger loading a bit...
    var rand = (this.random_delay === true ?
      Math.round(Math.random() * 3000) : 0);
    if (t > 0) {
      setTimeout(fadeIn, rand);
    } else {
      fadeIn();
    }
  }

});

