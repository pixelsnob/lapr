/**
 * maker view
 * 
 */
define([
  'views/base',
  'models/maker',
  'forms/maker',
  'views/mixins/admin_form'
], function(
  BaseView,
  MakerModel,
  MakerForm,
  AdminFormMixin
) {
  
  var view = BaseView.extend({
    tagName: 'tr',
    model: new MakerModel,
    initialize: function() {
      this.form = new MakerForm({ model: this.model });
    }
  });

  return view.mixin(AdminFormMixin);
});

