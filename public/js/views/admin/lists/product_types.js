/**
 * product_types view
 * 
 */
define([
  './base',
  './items/product_type'
], function(
  ListBaseView,
  ProductTypeView
) {

  return ListBaseView.extend({
    view: ProductTypeView,
    title: 'Product Types'
  });

});
