/**
 * product_categories view
 * 
 */
import ListBaseView from './base';
import CategoryView from './items/product_category';

export default ListBaseView.extend({
  view: CategoryView,
  title: 'Product Categories'
});
