/**
 * Top-level app view
 * 
 */
define([
  'views/base',
  'views/products',
  'views/tags_tree',
  'views/categories_nav',
  'views/products_categories_search',
  'collections/products'
], function(
  BaseView,
  ProductsView,
  TagsTreeView,
  CategoriesNavView,
  ProductsCategoriesSearchView,
  ProductsCollection
) {
  return BaseView.extend({ 
    
    el: 'body',

    events: {
      'click nav li a': 'navigate'
    },

    initialize: function() {
      this.products = new ProductsCollection;
      this.deferred = this.products.fetch();
      this.products_categories_search_view = new ProductsCategoriesSearchView({
        products: this.products
      });
    },

    navigate: function(ev) {
      var url = $(ev.currentTarget).attr('href');
      Backbone.history.navigate(url, true);
      return false;
    },
    
    showProductsByCategory: function(category) {
      var obj = this;
      this.deferred.done(function() {
        if (!obj.$el.find('#main .products-categories-search').length) {
          obj.$el.find('#main').html(obj.products_categories_search_view.render().el);
        }
        obj.products_categories_search_view.filter(category);
      });
      return false;
    },
    
    showProductsByTags: function(tags) {
      var obj = this;
      this.deferred.done(function() {
      });
      return false;
    },

    showTagsTree: function() {
      var $tags_tree = this.$el.find('.tags-tree');
      if (!$tags_tree.children().length) {
        $tags_tree.html(this.tags_tree_view.render().el);
      }
      $tags_tree.show();
    },
    
    hideTagsTree: function() {
      this.$el.find('.tags-tree').hide();
    }

  });
});

