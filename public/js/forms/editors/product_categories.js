/**
 * Product categories multiselect
 * 
 * 
 */
import Backbone from 'backbone';
import MultiSelectEditorView from './multi_select';
import ProductCategoriesView from 'views/admin/lists/product_categories';
import 'backbone-forms';

export default MultiSelectEditorView.extend({

  list_view: ProductCategoriesView

});
