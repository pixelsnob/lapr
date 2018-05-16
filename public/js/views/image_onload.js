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
  },

  // Returns a promise that resolves when image has loaded
  load: function() {
    return new Promise((resolve, reject) => {
      if (!this.src) {
        reject('src is not defined');
      }
      var images = loaded_images_collection.findWhere({ src: this.src });
      if (images) {
        resolve();
      } else {
        var tmp_img = new Image;
        tmp_img.onload = () => {
          loaded_images_collection.add({
            src: this.src
          });
          resolve();
        };
        tmp_img.onerror = err => {
          reject(err);
        };
        tmp_img.src = this.src;
      }
    });
  }

});

