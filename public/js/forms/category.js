/**
 * product_category form
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
      slug: {
        type: 'Text'
      }
    }
    
  });
});


