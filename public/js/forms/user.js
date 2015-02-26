/**
 * user form
 * 
 */
define([
  'backbone',
  'backbone-forms'
], function(
) {
  
  return Backbone.Form.extend({

    schema: {
      username: {
        type: 'Text',
        validators: [ 'required' ]
      },
      password: {
        type: 'Text',
        validators: [ 'required' ]
      }
    }
    
  });
});


