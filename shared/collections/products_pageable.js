/**
 * pageable products collection
 * 
 */
define([
  'backbone',
  'models/product',
  'backbone-paginator'
], function(
  backbone,
  ProductModel
) {
  return Backbone.PageableCollection.extend({
    
    model: ProductModel,

    mode: 'client',
    
    url: '/instruments',

    state: { pageSize: 100  }

  });
});
