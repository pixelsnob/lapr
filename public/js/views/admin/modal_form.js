/**
 * 
 * 
 */
define([
  'cms/views/modal/form'
], function(
  ModalFormView
) {
  
  return ModalFormView.extend({
    
    initialize: function(opts) {
      ModalFormView.prototype.initialize.call(this, opts);
      this.$el.addClass('admin-modal');
    }
  });

});

