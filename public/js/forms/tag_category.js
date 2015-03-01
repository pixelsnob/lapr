/**
 * tag_category form
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
      },
      sort_order: {
        title: 'Sort Order',
        type: 'Text',
        validators: [  ]
      }
    }
    
  });
});


