/**
 * Tags multiselect
 * 
 * 
 */
import Backbone from 'backbone';
import MultiSelectEditorView from './multi_select';
import TagCategoriesView from 'views/admin/lists/tag_categories';
import 'backbone-forms';

export default MultiSelectEditorView.extend({

  list_view: TagCategoriesView

});
