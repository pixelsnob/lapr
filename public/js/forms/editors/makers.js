/**
 * Makers multiselect
 * 
 * 
 */
import Backbone from 'backbone';
import MultiSelectEditorView from './multi_select';
import MakersView from 'views/admin/lists/makers';
import 'backbone-forms';

export default MultiSelectEditorView.extend({

  list_view: MakersView

});
