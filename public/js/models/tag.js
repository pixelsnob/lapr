/**
 * tag model
 * 
 */
import BaseModel from './base';

export default BaseModel.extend({

  url: function() {
    return '/api/tags/' + (this.id || '')
  },

  initialize: function(opts) {

  },

  toString: function() {
    return this.get('name');
  }

});
