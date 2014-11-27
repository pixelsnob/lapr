/**
 * product model
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
        type: 'Checkboxes',
        options: new ProductCategories
      },
      model_no: { type: 'Text' },
      price: { type: 'Text' },
      range: { type: 'Text' },
      sizes: { type: 'TextArea' },
      alt_names: { type: 'Text' }
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
      delete res.categories;
      return res;
    },

    toJSON: function() {
      var product    = BaseModel.prototype.toJSON.apply(this),
          categories = [];
      this.categories.forEach(function(category) {
        categories.push(category.id);
      });
      product.categories = categories;
      return product;
    }
  });
});
