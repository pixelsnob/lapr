/**
 * maker view
 * 
 */
import ListItemBaseView from './base';
import MakerModel from 'models/maker';
import MakerForm from 'forms/maker';

export default ListItemBaseView.extend({
  label: 'maker',
  title: 'Maker',

  model: new MakerModel,

  form_obj: MakerForm

});

