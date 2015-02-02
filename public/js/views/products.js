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
      var $results = this.$el.find('.results'),
          products = this.refs.filtered_products,
          obj      = this;
      if (append !== true) {
        $results.empty();
      }
      products.getPaged().forEach(function(product) {
        var view = new ProductView({
          model:              product,
          products:           obj.collection,
          refs:               obj.refs
        });
        $results.append(view.render().el);
      });
      this.toggleMoreLink();
      // temp
      this.$el.find('.stats').html(products.getEndIndex() + ' of ' + products.length);
      console.log(products.length);
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
