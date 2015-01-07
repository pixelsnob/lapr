/**
 * product model
 * 
 */
define([
  './base'
], function(BaseModel) {
  return BaseModel.extend({
    
    url: function() { return '/instruments/item/' + (this.id || ''); },
    
    initialize: function(opts) {
      if (opts && opts.id) {
        this.id = opts.id;
      }
    }
  });
});
