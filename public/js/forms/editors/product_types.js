/**
 * Product types multiselect
 * 
 * 
 */
import Backbone from 'backbone';
import SelectEditorView from './select';
import ProductTypesView from 'views/admin/lists/product_types';
import 'backbone-forms';

export default SelectEditorView.extend({

  list_view: ProductTypesView

});
