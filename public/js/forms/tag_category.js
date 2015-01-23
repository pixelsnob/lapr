/**
 * tag_category form
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
      },
      sort_order: {
        title: 'Sort Order',
        type: 'Text',
        validators: [  ]
      }
    }
    
  });
});


