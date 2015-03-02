/**
 * pages view
 * 
 */
define([
  'views/base',
  'views/admin/list_mixin',
  'views/admin/page'
], function(
  BaseView,
  AdminListMixin,
  PageView
) {

  var view = BaseView.extend({
    view: PageView,
    title: 'Pages',

    initialize: function(opts) {
    },

    onClose: function() {
    }
  });

  return view.mixin(AdminListMixin);
    
});

