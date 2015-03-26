/**
 * product_type view
 * 
 */
define([
  './base',
  'models/product_type',
  'forms/product_type'
], function(
  ListItemBaseView,
  ProductTypeModel,
  ProductTypeForm
) {
  
  return ListItemBaseView.extend({
    label: 'product type',
    title: 'Product Type',
    
    model: new ProductTypeModel,
    
    form_obj: ProductTypeForm
    
  });
});

