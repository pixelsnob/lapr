/**
 * Products list view
 * 
 */
define([
  'views/base',
  'views/product',
], function(
  BaseView,
  ProductView
) {
  
  return BaseView.extend({

    events: {
      'click .more':     'getMore'
    },

    initialize: function(opts) {
      this.collection = opts.collection;
      var refs = this.refs = this.collection.refs;
      this.listenTo(refs.product_categories, 'add remove change', this.render);
      this.listenTo(refs.makers, 'add remove change', this.render);
      this.listenTo(this.collection, 'filtered', function() {
        this.refs.filtered_products.setPage(1);
        this.render();
      });
      var obj = this;
      this.listenTo(this.collection, 'add', function(model) {
        // For highlighting, etc.
        model.is_new = true;
        refs.filtered_products.add(model);
        obj.render();
      });
    },
    
    render: function(append) {
      var fragment = document.createDocumentFragment(),
          obj      = this,
          $results = this.$el.find('.results');
      if (append !== true) {
        $results.empty();
      }
      this.refs.filtered_products.getPaged().forEach(function(product) {
        var view = new ProductView({
          model:              product,
          products:           obj.collection,
          refs:               obj.refs
        });
        $results.append(view.render().el);
      });
      this.toggleMoreLink();
      console.log('products render');
      return this;
    },

    getMore: function() {
      var products = this.refs.filtered_products;
      if (products.current_page * products.per_page < products.length) {
        products.next(); 
        this.render(true);
      }
    },

    toggleMoreLink: function() {
      if (this.refs.filtered_products.hasMore()) {
        this.$el.find('.more').show();
      } else {
        this.$el.find('.more').hide();
      }
    }

  });
  
});
