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
      var coll = this.collection;
      this.collection = new PageableProductsCollection(coll.models); 
      this.collection.refs = coll.refs;
      this.collection.getFirstPage();
      this.listenTo(this.collection, 'change add remove', this.render);
      this.listenTo(this.collection, 'add', function(model) {
        coll.add(model); 
        coll.sort();
      });
      //coll = null;
    }

  });

});
