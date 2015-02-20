/**
 * makers view
 * 
 */
define([
  'views/base',
  'views/admin/list_mixin',
  'views/admin/maker'
], function(
  BaseView,
  AdminListMixin,
  MakerView
) {

  var view = BaseView.extend({
    view: MakerView,
    title: 'Makers',
    
    initialize: function(opts) {
      
    }
  });

  return view.mixin(AdminListMixin);
    
});

