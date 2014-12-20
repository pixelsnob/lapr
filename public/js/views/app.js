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

    initialize: function() {
      var json = window.lapr;
      this.refs = {
        filtered_products:    new Backbone.Collection(json.product_categories),
        product_categories:   new ProductCategoriesCollection(json.product_categories),
        makers:               new MakersCollection(json.makers),
        tags:                 new TagsCollection(json.tags),
        tag_categories:       new TagCategoriesCollection(json.tag_categories)
      };
      this.products = new ProductsCollection(json.products, { refs: this.refs });
      this.products_view = new ProductsView({
        el:                 this.$el.find('.products'),
        collection:         this.products,
        refs:               this.refs
      });
      this.tags_tree_view = new TagsTreeView({
        filtered_products: this.refs.filtered_products,
        tags:              this.refs.tags,
        tag_categories:    this.refs.tag_categories
      });
    },

    renderProducts: function() {
      this.products_view.render();// <<<<<<<<<<< 
      this.$el.find('.tags-tree').html(this.tags_tree_view.render().el);
    }

  });
});

