/**
 * Top-level app view
 * 
 */
define([
  'views/base',
  'views/products',
  'collections/products',
  'collections/product_categories',
  'collections/makers',
  'collections/tags',
  'collections/tag_categories',
], function(
  BaseView,
  ProductsView,
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
    },

    renderProducts: function() {
      this.products_view.render(); 
    }

  });
});

