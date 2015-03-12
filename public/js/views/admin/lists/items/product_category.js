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
    
    createForm: function() {
      this.form = new CategoryForm({
        model:      this.model,
        collection: this.collection
      });
    }
  });
});

