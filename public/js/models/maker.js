/**
 * maker model
 * 
 */
define([
  './base'
], function(BaseModel) {
  return BaseModel.extend({
    
    initialize: function(opts) {
      
    },

    toString: function() {
      return this.get('name');
    }

  });
});
