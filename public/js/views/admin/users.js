/**
 * users view
 * 
 */
define([
  'views/base',
  'views/admin/list_mixin',
  'views/admin/user'
], function(
  BaseView,
  AdminListMixin,
  UserView
) {

  var view = BaseView.extend({
    view: UserView,
    title: 'Users',
    
    initialize: function(opts) {
      
    }
  });

  return view.mixin(AdminListMixin);
    
});

