/**
 * Top-level app view
 * 
 */
define([
  'views/base',
  'views/products',
  'views/tags_tree',
  'views/categories_nav',
  'collections/products'
], function(
  BaseView,
  ProductsView,
  TagsTreeView,
  CategoriesNavView,
  ProductsCollection
) {
  return BaseView.extend({ 
    
    el: 'body',

    events: {
      'click a.navigate': 'navigate'
    },

    initialize: function() {
      this.products = new ProductsCollection;
      this.deferred = this.products.fetch();
      this.products_view = new ProductsView({
        el:                 this.$el.find('.products'),
        collection:         this.products
      });
      this.tags_tree_view = new TagsTreeView({
        products: this.products
      });
      this.categories_view = new CategoriesNavView({
        products: this.products
      });
      this.trigger('ready');
    },

    navigate: function(ev) {
      var url = $(ev.currentTarget).attr('href');
      Backbone.history.navigate(url, true);
      return false;
    },
    
    showProductsByCategory: function(category) {
      var obj = this;
      this.deferred.done(function() {
        obj.hideTagsTree();
        obj.showCategoriesNav();
        obj.categories_view.setSelectedCategory(category);
        obj.products_view.filterProductsByCategory();

      });
      return false;
    },

    showProductsByTags: function(tags) {
      var obj = this;
      this.deferred.done(function() {
        obj.showTagsTree();
        obj.hideCategoriesNav();
        obj.tags_tree_view.setSelectedTags(tags);
        obj.products_view.filterProductsByTags();
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
    }

  });
});

