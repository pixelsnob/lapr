/**
 * content_blocks collection
 * 
 */
import ContentBlockModel from '../models/content_block';
export default Backbone.Collection.extend({

  url: '/api/content-blocks',

  model: ContentBlockModel,

  comparator: 'name',

  initialize: function() {},

  fetch: function() {
    return new Promise((resolve, reject) => {
      // Skip network call if on server and populate from a window object
      if (window.__lapr_ssr && window.__lapr_data) {
        this.reset(window.__lapr_data.content_blocks);
        return resolve();
      }
      Backbone.Collection.prototype.fetch.call(this, arguments).then(collection => {
        resolve(collection);
      });
    });
  }
});
