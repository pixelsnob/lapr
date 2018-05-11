/**
 * product_category view
 * 
 */
import ListItemBaseView from './base';
import CategoryModel from 'models/product_category';
import CategoryForm from 'forms/category';

export default ListItemBaseView.extend({
  label: 'category',
  title: 'Category',

  model: new CategoryModel,

  form_obj: CategoryForm

});

