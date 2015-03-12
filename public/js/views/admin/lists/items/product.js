/**
 * product list item view
 * 
 */
define([
  './base',
  'views/admin/modal/form',
  'models/product',
  'forms/product'
], function(
  ListItemBaseView,
  ModalFormView,
  ProductModel,
  ProductForm
) {
  
  return ListItemBaseView.extend({
    
    label: 'product',
    title: 'Product',
    
    model: new ProductModel,
    
    initialize: function() {
    },

    createForm: function() {
      this.form = new ProductForm({
        model: this.model,
        collection: this.collection,
        refs: this.collection.refs
      });
    }

  });

});

