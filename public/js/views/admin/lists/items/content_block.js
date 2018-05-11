/**
 * content_block view
 * 
 */
import ListItemBaseView from './base';
import ContentBlockModel from 'models/content_block';
import ContentBlockForm from 'forms/content_block';

export default ListItemBaseView.extend({

  label: 'content_block',

  title: 'Content Block',

  model: new ContentBlockModel,

  form_obj: ContentBlockForm

});

