/**
 * maker model
 * 
 */
define([
  './base'
], function(BaseModel) {
  return BaseModel.extend({
    
    url: function() { return '/makers/' + (this.id || '') },

    initialize: function(opts) {
      
    },

    toString: function() {
      return this.get('name');
    }

  });
});
