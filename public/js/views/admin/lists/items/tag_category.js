/**
 * tag_category view
 * 
 */
import ListItemBaseView from './base';
import TagCategoryModel from 'models/tag_category';
import TagCategoryForm from 'forms/tag_category';

export default ListItemBaseView.extend({
  label: 'tag category',
  title: 'Tag Category',

  model: new TagCategoryModel,

  form_obj: TagCategoryForm

});

