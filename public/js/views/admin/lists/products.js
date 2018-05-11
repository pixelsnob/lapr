/**
 * products list view
 * 
 */
import ListBaseView from './base';
import ProductView from 'views/admin/lists/items/product';
import PageableProductsCollection from 'collections/products_pageable';

export default ListBaseView.extend({

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
      model.collection = coll;
      coll.add(model);
      coll.sort();
    });
  }

});
