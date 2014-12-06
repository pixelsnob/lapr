/**
 * tonal_qualities view
 * 
 */
define([
  'views/base',
  'views/mixins/admin_list',
  'views/admin/tonal_quality',
  'lib/view_mixin'
], function(
  BaseView,
  AdminListMixin,
  TonalQualityView
) {

  var view = BaseView.extend({
    view: TonalQualityView,
    title: 'Tonal Qualities',
    events: {
    },
    initialize: function(opts) {
    }
  });

  return view.mixin(AdminListMixin);

});
