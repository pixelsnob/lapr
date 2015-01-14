/**
 * Top-level app view
 * 
 */
define([
  'views/base',
  'views/products',
  'views/tags_tree',
  'views/categories_nav',
  'collections/products',
  'collections/filtered_products',
  'collections/product_categories',
  'collections/makers',
  'collections/tags',
  'collections/tag_categories'
], function(
  BaseView,
  ProductsView,
  TagsTreeView,
  CategoriesNavView,
  ProductsCollection,
  FilteredProductsCollection,
  ProductCategoriesCollection,
  MakersCollection,
  TagsCollection,
  TagCategoriesCollection
) {
  return BaseView.extend({ 
    
    el: 'body',

    events: {
      'click a.navigate': 'navigate'
    },

    initialize: function() {
      var json = window.lapr;
      this.refs = {
        filtered_products:    new FilteredProductsCollection(json.products),
        product_categories:   new ProductCategoriesCollection(json.product_categories),
        makers:               new MakersCollection(json.makers),
        tags:                 new TagsCollection(json.tags),
        tag_categories:       new TagCategoriesCollection(json.tag_categories),
        selected_tags:        new Backbone.Collection,
        selected_categories:  new Backbone.Collection
      };
      this.products = new ProductsCollection(json.products, { refs: this.refs });
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
    },
    
    navigate: function(ev) {
      var url = $(ev.currentTarget).attr('href');
      Backbone.history.navigate(url, true);
      return false;
    },
    
    showProductsByCategory: function(category) {
      this.hideTagsTree();
      this.showCategoriesNav();
      this.categories_view.setSelectedCategory(category);
      //setTimeout(_.bind(this.products_view.showProducts,
      //  this.products_view), 0);
      return false;
    },

    showProductsByTags: function(tags) {
      this.showTagsTree();
      this.hideCategoriesNav();
      this.tags_tree_view.setSelectedTags(tags);
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

