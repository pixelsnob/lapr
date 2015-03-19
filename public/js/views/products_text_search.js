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
      // Create products index to run searches on
      this.products_index = lunr(function() {
        this.ref('_id');
        this.field('name');
        this.field('alt_names');
      });
      var obj = this;
      this.products.each(function(product) {
        obj.products_index.add(product.toJSON()); 
      });
    },

    render: function() {
      var form_obj  = new TextSearchForm,
          form      = form_obj.render(),
          $input    = form.$el.find('input'),
          obj       = this;
      $input.typeahead({
        highlight: true
      },
      {
        name: 'products',
        source: function(query, cb) {
          var search_res = obj.products_index.search(query),
              products   = [];
          _.each(search_res, function(product) {
            var product_model = obj.products.findWhere({
              _id: Number(product.ref)
            });
            if (product_model) {
              products.push({ value: product_model.get('name'), model: product_model });
            }
          });
          cb(products.splice(0, 20)); 
        }
      }).on('typeahead:selected', function(ev, product) {
        // View product details
        var url = '/instruments/' + product.model.get('slug') + '/' +
                  product.model.id;
        Backbone.history.navigate(url, { trigger: true });
        $input.typeahead('val', '');
        return false;
      });
      return form;
    }

  });
});

