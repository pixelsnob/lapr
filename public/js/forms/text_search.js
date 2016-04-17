/**
 * Product text search form
 * 
 */
define([
  'forms/base'
], function(
  BaseForm
) {
  
  var c = 1;

  return BaseForm.extend({
    
    initialize: function(opts) {
      this.schema = {};
      this.schema['search' + c] = { type: 'Text', title: '' };
      BaseForm.prototype.initialize.apply(this, opts);
      c++;
    }
    
  });
});


