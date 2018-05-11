/**
 * product_types view
 * 
 */
import ListBaseView from './base';
import ProductTypeView from './items/product_type';

export default ListBaseView.extend({
  view: ProductTypeView,
  title: 'Product Types'
});
