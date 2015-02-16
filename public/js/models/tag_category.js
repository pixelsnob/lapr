/**
 * tag_category model
 * 
 */
define([
  './base'
], function(BaseModel) {
  return BaseModel.extend({
    
    url: function() { return '/api/tag-categories/' + (this.id || '') },

    initialize: function(opts) {
      
    },

    toString: function() {
      return this.get('name');
    }

  });
});
