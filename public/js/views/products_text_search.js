/**
 * Products text search form
 * 
 */
define([
  'views/base',
  'forms/text_search',
  'lunr',
  'template',
  'typeahead'
], function(
  BaseView,
  TextSearchForm,
  lunr,
  template
) {
  return BaseView.extend({ 
    
    events: {
    },
    
    initialize: function(opts) {
      this.products = opts.products;
      this.products_index = lunr(function() {
        this.ref('_id');
        this.field('name');
      });
      var obj = this;
      this.products.each(function(product) {
        obj.products_index.add(product.toJSON()); 
      });
    },

    render: function() {
      var form_obj  = new TextSearchForm,
          form      = form_obj.render(),
          obj       = this;
      form.$el.find('input').typeahead({
        //minLength: 3,
        highlight: true
      },
      {
        name: 'products',
        source: function(query, cb) {
          var search_res = obj.products_index.search(query),
              products   = [];
          _.each(search_res, function(product) {
            var product_model = obj.products.findWhere({ _id: Number(product.ref) });
            if (product_model) {
              products.push({ value: product_model.get('name') });
            }
          });
          cb(products); 
        }
      }); 
      return form;
    }

  });
});

