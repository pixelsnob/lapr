/**
 * Products text search form
 * 
 */
define([
  'views/base',
  'forms/text_search',
  'template',
  'typeahead'
], function(
  BaseView,
  TextSearchForm,
  template
) {
  return BaseView.extend({ 
    
    events: {
    },
    
    initialize: function(opts) {
      this.products = opts.products;
      //this.input_id = opts.input_id;
      this.products.createProductsIndex();
      var obj = this;
      // Keep list in sync with products
      this.listenTo(this.products, 'add change remove', function(model) {
        obj.products.createProductsIndex();
        obj.render();
      });
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
    
    blur: function() {
      if (this.$input.length) {
        this.$input.get(0).blur();
      }
    },

    render: function() {
      var form_obj  = new TextSearchForm,
          form      = form_obj.render(),
          obj       = this;
      this.$input = form.$el.find('input');
      var products = [];
      this.$input.typeahead({
        highlight: false,
        hint: false
      },
      {
        name: 'products',
        source: function(query, cb) {
          var products = obj.getSearchResults(query);
          cb(products.splice(0, 40)); 
        },
        templates: {
          suggestion: function(data) {
            var tpl = 'partials/products_text_search_form/suggestion';
            return template.render(tpl, data);
          }
        }
      }).on('typeahead:selected', function(ev, data) {
        // View product details
        var url = '/instruments/' + data.product.slug + '/' +
                  data.product._id + '?nav=0';
        obj.trigger('selected');
        Backbone.history.navigate(url, { trigger: true });
        return false;
      }).on('keypress', function(ev) {
        // Show results
        if (ev.keyCode == 13 && obj.$input.typeahead('val').length) {
          var url = '/instruments/text-search/' +
                    encodeURIComponent($(this).typeahead('val'));
          Backbone.history.navigate(url, { trigger: true });
          $(this).typeahead('close');
          obj.trigger('selected');
          return false;
        }
      }).on('blur', function(ev) {
        obj.$input.typeahead('val', '');
      }).attr('tabindex', 1);
      return form;
    }

  });
});

