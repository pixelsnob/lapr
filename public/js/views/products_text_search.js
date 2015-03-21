/**
 * Products text search results
 * 
 */
define([
  'views/base',
  'views/products',
  //'views/product_category_header',
  'template'
], function(
  BaseView,
  ProductsView,
  template
) {
  return BaseView.extend({ 
    
    events: {
    },
    
    initialize: function(opts) {
      this.products = opts.products;
      this.products_view = new ProductsView({
        collection:         this.products
      });
    },

    render: function() {
      this.$el.html(template.render('partials/products_search', {
        products: [],
        paginate: null,
        heading:  'Search Results'
      }));
      this.$el.addClass('products-text-search');
      this.products_view.setElement(this.$el.find('.products'));
      return this;
    },

    onClose: function() {
      this.products.trigger('kill');
      this.products.unbind();
      this.products.unbindRefs();
      this.products.refs.filtered_products.reset();
    }

  });
});

