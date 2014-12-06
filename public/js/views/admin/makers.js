/**
 * makers view
 * 
 */
define([
  'views/base',
  'views/mixins/admin_list',
  'views/admin/maker',
  'lib/view_mixin'
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

