/**
 * maker model
 * 
 */
define([
  './base'
], function(BaseModel) {
  return BaseModel.extend({
    
    schema: {
      name: {
        type: 'Text',
        validators: [ 'required' ]
      }
    },

    initialize: function(opts) {
      
    },

    toString: function() {
      return this.get('name');
    }

  });
});
