/**
 * user form
 * 
 */
define([
  'forms/base'
], function(
  BaseForm
) {
  
  return BaseForm.extend({

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


