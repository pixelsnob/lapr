/**
 * product list item view
 * 
 */
define([
  './base',
  'views/admin/modal/form',
  'models/product',
  'forms/product',
  'template'
], function(
  ListItemBaseView,
  ModalFormView,
  ProductModel,
  ProductForm,
  template
) {
  
  return ListItemBaseView.extend({
    
    label: 'product',
    title: 'Product',
    
    model: new ProductModel,
    
    form_obj: ProductForm,

    render: function() {
      this.$el.append(template.render('admin/product_list_item', this.model.toJSON())); 
      return this;
    },


  });

});

