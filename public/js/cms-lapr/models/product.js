/**
 * 
 * 
 */
define([
  'cms/models/base',
  '../collections/product_categories'
], function(BaseModel, ProductCategories) {
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
        type: 'Select',
        options: function(callback, editor) {
          //console.log(editor.model.categories);
          callback(editor.model.categories);
        }
      }
    },

    initialize: function(opts) {
      this.id = opts.id;
      if (typeof this.categories == 'undefined') {
        this.categories = new ProductCategories;
      }
    },

    parse: function(res) {
      this.categories = new ProductCategories(res.categories, {
        parse: true
      });
      delete res.hobbies;
      return res;
    }
  });
});
