/**
 * product list item view
 * 
 */
import ListItemBaseView from './base';
import ModalFormView from 'views/admin/modal/form';
import ProductModel from 'models/product';
import ProductForm from 'forms/product';
import template from 'template';

export default ListItemBaseView.extend({

  label: 'product',
  title: 'Product',

  model: new ProductModel,

  form_obj: ProductForm,

  render: function() {
    this.$el.append(template.render('admin/product_list_item', this.model.toJSON()));
    return this;
  }


});

