/**
 * user view
 * 
 */
define([
  'views/base',
  'models/user',
  'forms/user',
  'views/admin/form_mixin'
], function(
  BaseView,
  UserModel,
  UserForm,
  AdminFormMixin
) {
  
  var view = BaseView.extend({
    label: 'maker',
    title: 'User',
    model: new UserModel,
    initialize: function() {
      this.form = new UserForm({ model: this.model });
    }
  });

  return view.mixin(AdminFormMixin);
});

