/**
 * product_category model
 * 
 */
import BaseModel from './base';

export default BaseModel.extend({

  url: function() {
    return '/api/categories/' + (this.id || '')
  },

  initialize: function(opts) {

  },

  toString: function() {
    return this.get('name');
  }

});
