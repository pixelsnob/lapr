/**
 * product model
 * 
 */
define([
  'cms/models/base',
  '../collections/product_categories',
  '../collections/makers',
  'views/forms/editors/multi_select',
  'views/forms/editors/images'
], function(BaseModel, ProductCategories, Makers, MultiSelectEditor, ImagesEditor) {
  return BaseModel.extend({
    
    url: function() { return '/products/item/' + (this.id || ''); },

    schema: {
      name: {
        type: 'Text',
        validators: [ 'required' ]
      },
      description: {
        type: 'TextArea'
      },
      alt_names: {
        type: 'Text'
      },
      categories: {
        type: MultiSelectEditor,
        validators: [ 'required' ],
        options: new ProductCategories
      },
      model_no: {
        type: 'Text'
      },
      makers: {
        type: MultiSelectEditor,
        options: new Makers
      },
      price: {
        type: 'Text'
      },
      range: {
        type: 'Text'
      },
      sizes: {
        type: 'TextArea'
      },
      alt_names: {
        type: 'Text'
      },
      images: {
        type: 'Images'
      }
    },
    
    initialize: function(opts) {
      if (opts && opts.id) {
        this.id = opts.id;
      }
    }
  });
});
