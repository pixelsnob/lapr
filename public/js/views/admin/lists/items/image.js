/**
 * maker view
 * 
 */
import ListItemBaseView from './base';
import ImageModel from 'models/image';
import ImageForm from 'forms/image';

export default ListItemBaseView.extend({
  label: 'image',
  title: 'Image',

  model: new ImageModel,

  form_obj: ImageForm

});

