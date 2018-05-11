/**
 * product_type view
 * 
 */
import ListItemBaseView from './base';
import ProductTypeModel from 'models/product_type';
import ProductTypeForm from 'forms/product_type';

export default ListItemBaseView.extend({
  label: 'product type',
  title: 'Product Type',

  model: new ProductTypeModel,

  form_obj: ProductTypeForm

});

