/**
 * users view
 * 
 */
define([
  './base',
  'views/admin/user'
], function(
  ListBaseView,
  AdminListMixin,
  UserView
) {

  return ListBaseView.extend({
    view: UserView,
    title: 'Users',
    
    initialize: function(opts) {
      
    }
  });

  return view.mixin(AdminListMixin);
    
});

