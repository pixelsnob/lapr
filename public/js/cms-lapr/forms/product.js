/**
 * Form for editing page metadata
 * 
 */
define([
  'backbone',
  'backbone-forms',
  '../models/product_category'
], function(Backbone) {
  
  return Backbone.Form.extend({
    schema: {
      name: {
        type: 'Text',
        validators: [ 'required' ]
      },
      description: {
        type: 'TextArea'
      },
      alt_names: { type: 'Text' },
      category: { type: 'NestedModel', model: ProductCategory }
    }
  });
});


