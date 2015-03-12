/**
 * products list view
 * 
 */
define([
  './base',
  'views/admin/lists/items/product',
  'collections/products_pageable'
], function(
  ListBaseView,
  ProductView,
  PageableProductsCollection
) {

  return ListBaseView.extend({
    
    view: ProductView,
    title: 'Products',
    
    paged: true,
    
    initialize: function(opts) {
      ListBaseView.prototype.initialize.apply(this, arguments);
      var refs = this.collection.refs;
      this.collection = new PageableProductsCollection(this.collection.models); 
      this.collection.refs = refs;
      this.collection.getFirstPage();
      this.listenTo(this.collection, 'change add remove', this.render);
      refs = null;
    }

  });

});
