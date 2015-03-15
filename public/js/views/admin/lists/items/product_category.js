/**
 * product_category view
 * 
 */
define([
  './base',
  'models/product_category',
  'forms/category'
], function(
  ListItemBaseView,
  CategoryModel,
  CategoryForm
) {
  
  return ListItemBaseView.extend({
    label: 'category',
    title: 'Category',
    
    model: new CategoryModel,
    
    form_obj: CategoryForm
    
  });
});

