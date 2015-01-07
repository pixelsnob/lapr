/**
 * Top-level app view
 * 
 */
define([
  'views/base',
  'views/products',
  'views/tags_tree',
  'collections/products',
  'collections/product_categories',
  'collections/makers',
  'collections/tags',
  'collections/tag_categories',
], function(
  BaseView,
  ProductsView,
  TagsTreeView,
  ProductsCollection,
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
        filtered_products:    new Backbone.Collection(json.products),
        product_categories:   new ProductCategoriesCollection(json.product_categories),
        makers:               new MakersCollection(json.makers),
        tags:                 new TagsCollection(json.tags),
        tag_categories:       new TagCategoriesCollection(json.tag_categories),
        selected_tags:        new Backbone.Collection
      };
      this.products = new ProductsCollection(json.products, { refs: this.refs });
      this.products_view = new ProductsView({
        el:                 this.$el.find('.products'),
        collection:         this.products,
        refs:               this.refs
      });
      this.tags_tree_view = new TagsTreeView({
        refs: this.refs
      });
    },
    
    navigate: function(ev) {
      var url = $(ev.currentTarget).attr('href');
      switch (url) {
        case '/products':
          this.renderProducts();
          break;
        case '/tags':
          this.filterProductsByTags();
          break;
      }
      Backbone.history.navigate(url, true);
      return false;
    },
    
    renderProducts: function() {
      this.hideTagsTree();
      setTimeout(_.bind(this.products_view.showAllProducts,
        this.products_view), 0);
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

    filterProductsByTags: function(tags) {
      this.showTagsTree();
      this.products_view.filterProductsByTags(tags);
      this.tags_tree_view.setSelectedTags(tags);
      return false;
    }

  });
});

