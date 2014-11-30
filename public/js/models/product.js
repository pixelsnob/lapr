/**
 * product model
 * 
 */
define([
  'cms/models/base',
  '../collections/product_categories',
  '../collections/makers',
  'views/forms/editors/multi_select',
  //'form-adapters/backbone.bootstrap-modal',
  'form-editors/list'
], function(BaseModel, ProductCategories, Makers, MultiSelectEditor) {
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
        type: 'List',
        validators: [ 'required' ]
        //itemType: 'Object'
        //itemToString: 'test',
        //options: [ 'test1.jpg', 'test2.jpg' ]
      }
    },
    
    initialize: function(opts) {
      this.id = opts.id;
    }
  });
});
