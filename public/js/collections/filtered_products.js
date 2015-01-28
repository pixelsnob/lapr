/**
 * filtered_products collection
 * 
 */
define([
  '../models/product',
  '../models/maker',
  'backbone-paginator'
], function(ProductModel, MakerModel) {
  return Backbone.PageableCollection.extend({
    
    url: '/products',

    model: ProductModel,

    comparator: 'name',

    mode: 'client',

    state: {
      firstPage: 0,
      currentPage: 0,
      pageSize: 60
    }

  });
});
