/**
 * Products search by categories
 * 
 */
define([
  'views/base',
  'views/products',
  'views/categories_nav',
  'template'
], function(
  BaseView,
  ProductsView,
  CategoriesNavView,
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
      this.categories_view = new CategoriesNavView({
        products: this.products
      });
    },

    filter: function(category) {
      this.showCategoriesNav();
      this.categories_view.setSelectedCategory(category);
      this.products_view.filterProductsByCategory();
      return false;
    },
    
    showCategoriesNav: function() {
      var $categories = this.$el.find('.categories');
      if (!$categories.children().length) {
        $categories.html(this.categories_view.render().el);
      }
      $categories.show();
    },

    hideCategoriesNav: function() {
      this.$el.find('.categories').hide();
    },

    render: function() {
      this.$el.html(template.render('products_categories_search', {
        products: [], paginate: null, heading: null
      }));
      this.$el.addClass('products-categories-search');
      this.products_view.setElement(this.$el.find('.products'));
      return this;
    }

  });
});

