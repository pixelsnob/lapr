/**
 * maker form
 * 
 */
define([
  'forms/base'
], function(
  BaseForm
) {
  
  return BaseForm.extend({

    schema: {
      name: {
        type: 'Text',
        validators: [ 'required' ]
      }
    }
    
  });
});


