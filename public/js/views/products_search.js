/**
 * Products search by categories
 * 
 */
define([
  'views/base',
  'views/products',
  'views/navs/categories',
  'views/product_category_header',
  'views/products_search_stats',
  'template'
], function(
  BaseView,
  ProductsView,
  CategoriesNavView,
  ProductCategoryHeaderView,
  ProductsSearchStatsView,
  template
) {
  return BaseView.extend({ 
    
    events: {
      //'click .toggle-sort-direction':  'toggleSortDirection'
    },
    
    initialize: function(opts) {
      this.products = opts.products;
      this.products_view = new ProductsView({
        collection:         this.products
      });
      this.nav_view = new CategoriesNavView({ products: this.products });
      this.product_category_header_view = new ProductCategoryHeaderView({
        products: this.products
      });
      this.stats_view = new ProductsSearchStatsView({
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
      this.$el.find('.categories').html(this.nav_view.render().el);
      this.product_category_header_view.setElement(this.$el.find('h1'));
      this.stats_view.setElement(this.$el.find('.stats'));
      return this;
    },
    
    toggleSortDirection: function(ev) {
      this.products_view.toggleSortDirection();
    },

    onClose: function() {
      this.products.trigger('kill');
      this.products.unbind();
      this.products.unbindRefs();
      this.products.refs.filtered_products.reset();
      this.stats_view.close();
      this.nav_view.close();
      this.products_view.close();
    }

  });
});

