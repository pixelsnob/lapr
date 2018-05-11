/**
 * user view
 * 
 */
import ListItemBaseView from './base';
import UserModel from 'models/user';
import UserForm from 'forms/user';

export default ListItemBaseView.extend({
  label: 'user',
  title: 'User',

  model: new UserModel,

  form_obj: UserForm

});

