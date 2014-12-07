/**
 * product model
 * 
 */
define([
  './base'
], function(BaseModel) {
  return BaseModel.extend({
    
    url: function() { return '/products/item/' + (this.id || ''); },
    
    initialize: function(opts) {
      if (opts && opts.id) {
        this.id = opts.id;
      }
    }
  });
});
