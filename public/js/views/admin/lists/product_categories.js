/**
 * product_categories view
 * 
 */
define([
  './base',
  './items/product_category'
], function(
  ListBaseView,
  CategoryView
) {

  return ListBaseView.extend({
    view: CategoryView,
    title: 'Product Categories'
  });

});
