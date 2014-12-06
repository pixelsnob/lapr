/**
 * tonal_quality view
 * 
 */
define([
  'views/base',
  'models/tonal_quality',
  'forms/tonal_quality',
  'views/mixins/admin_form'
], function(
  BaseView,
  TonalQualityModel,
  TonalQualityForm,
  AdminFormMixin
) {
  
  var view = BaseView.extend({
    tagName: 'tr',
    label: 'tonal quality',
    title: 'Tonal Quality',
    model: new TonalQualityModel,
    initialize: function() {
      this.form = new TonalQualityForm({ model: this.model });
    }
  });

  return view.mixin(AdminFormMixin);
});

