/**
 * product model
 * 
 */
define([
  'cms/models/base',
  '../collections/product_categories',
  '../collections/makers',
  'views/forms/editors/multi_select'
], function(BaseModel, ProductCategories, Makers, MultiSelect) {
  return BaseModel.extend({
    
    url: function() { return '/products/' + this.id; },

    schema: {
      name: {
        type: 'Text',
        validators: [ 'required' ]
      },
      description: {
        type: 'TextArea'
      },
      alt_names: { type: 'Text' },

      categories: {
        type: MultiSelect,
        options: new ProductCategories
      },
      model_no: { type: 'Text' },
      makers: {
        type: MultiSelect,
        options: new Makers
      },
      price: { type: 'Text' },
      range: { type: 'Text' },
      sizes: { type: 'TextArea' },
      alt_names: { type: 'Text' }
    },
    
    initialize: function(opts) {
      this.id = opts.id;
    }
  });
});
