/**
 * user model
 * 
 */
define([
  './base'
], function(BaseModel) {
  return BaseModel.extend({
    
    url: function() { return '/api/users/' + (this.id || '') },

    initialize: function(opts) {
      
    },

    toString: function() {
      return this.get('username');
    }

  });
});
