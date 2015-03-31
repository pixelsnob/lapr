/**
 * Products search by categories
 * 
 */
define([
  'views/base',
  'views/products',
  'views/navs/categories',
  'views/product_category_header',
  'template'
], function(
  BaseView,
  ProductsView,
  CategoriesNavView,
  ProductCategoryHeaderView,
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
      this.product_category_header_view = new ProductCategoryHeaderView({
        products: this.products
      });
    },

    render: function() {
      this.$el.html(template.render('partials/products_search', {
        products: [],
        paginate: null,
        heading:  null
      }));
      this.$el.addClass('products-categories-search');
      this.products_view.setElement(this.$el.find('.products'));
      var nav_view = new CategoriesNavView({ products: this.products });
      this.$el.find('.categories').html(nav_view.render().el);
      this.product_category_header_view.setElement(this.$el.find('h1'));
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

