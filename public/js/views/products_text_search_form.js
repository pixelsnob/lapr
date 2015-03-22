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
      this.products.createProductsIndex();
    },

    getSearchResults: function(search) {
      var search_res = this.products.search(search),
          products   = [],
          obj        = this;
      _.each(search_res, function(product) {
        product = product.toJSON();
        if (_.isArray(product.makers) && product.makers.length) {
          product.makers = product.makers.map(function(maker_id) {
            return obj.products.refs.makers.findWhere({
              _id: Number(maker_id)
            }).toJSON();
          });
        }
        products.push({
          value: product.name,
          // Pass the model along to have access other fields
          product: product
        });
      });
      return products;
    },
    
    render: function() {
      var form_obj  = new TextSearchForm,
          form      = form_obj.render(),
          $input    = form.$el.find('input'),
          obj       = this;
      var products = [];
      $input.typeahead({
        highlight: false,
        hint: false
      },
      {
        name: 'products',
        source: function(query, cb) {
          var products = obj.getSearchResults(query);
          cb(products.splice(0, 15)); 
        },
        templates: {
          suggestion: function(data) {
            var tpl = 'partials/products_text_search_form/suggestion';
            return template.render(tpl, data.product);
          }
        }
      }).on('typeahead:selected', function(ev, data) {
        // View product details
        var url = '/instruments/' + data.product.slug + '/' +
                  data.product._id;
        Backbone.history.navigate(url, { trigger: true });
        return false;
      }).on('keypress', function(ev) {
        // Show results
        if (ev.keyCode == 13 && $input.typeahead('val').length) {
          var url = '/instruments/text-search/' +
                    encodeURIComponent($(this).typeahead('val'));
          Backbone.history.navigate(url, { trigger: true });
          $(this).typeahead('close');
          return false;
        }
      }).on('blur', function(ev) {
        $input.typeahead('val', '');
      }).attr('tabindex', 1);
      return form;
    }

  });
});

