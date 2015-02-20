/**
 * maker view
 * 
 */
define([
  'views/base',
  'models/maker',
  'forms/maker',
  'views/admin/form_mixin'
], function(
  BaseView,
  MakerModel,
  MakerForm,
  AdminFormMixin
) {
  
  var view = BaseView.extend({
    label: 'maker',
    title: 'Maker',
    model: new MakerModel,
    initialize: function() {
      this.form = new MakerForm({ model: this.model });
    }
  });

  return view.mixin(AdminFormMixin);
});

