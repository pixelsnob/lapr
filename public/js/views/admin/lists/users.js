/**
 * Users view
 * 
 */
define([
  './base',
  './items/user'
], function(
  ListBaseView,
  UserView
) {

  return ListBaseView.extend({
    view: UserView,
    title: 'Users'
  });

});
