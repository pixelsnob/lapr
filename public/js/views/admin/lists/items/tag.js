/**
 * tag view
 * 
 */
import ListItemBaseView from './base';
import TagModel from 'models/tag';
import TagForm from 'forms/tag';

export default ListItemBaseView.extend({
  label: 'tag',
  title: 'Tag',

  model: new TagModel,

  form_obj: TagForm

});

