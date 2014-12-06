/**
 * tonal_quality form
 * 
 */
define([
  'backbone',
  'backbone-forms'
], function(
) {
  
  return Backbone.Form.extend({

    schema: {
      name: {
        type: 'Text',
        validators: [ 'required' ]
      }
    }
    
  });
});


