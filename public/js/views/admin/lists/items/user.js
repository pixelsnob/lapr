/**
 * user view
 * 
 */
define([
  './base',
  'models/user',
  'forms/user'
], function(
  ListItemBaseView,
  UserModel,
  UserForm
) {
  
  return ListItemBaseView.extend({
    label: 'user',
    title: 'User',
    
    model: new UserModel,
    
    form: UserForm

  });

});

