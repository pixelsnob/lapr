/**
 * Override of modal view for backbone forms. Save event attempts to commit()
 * the form
 * 
 */
define([
  './base',
  'template'
], function(ModalView, template) {
  return ModalView.extend({
    
    initialize: function(opts) {
      this.form = opts.form;
      ModalView.prototype.initialize.apply(this);
    },
    
    save: function() {
      var errors = this.form.validate(), obj = this;
      if (!errors) {
        this.trigger('save');
      }
      return false;
    }

  });
});
