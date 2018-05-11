/**
 * Override of modal view for backbone forms. Save event attempts to commit()
 * the form
 * 
 */
import ModalView from './base';

export default ModalView.extend({

  initialize: function(opts) {
    this.form = opts.form;
    ModalView.prototype.initialize.apply(this);
  },

  save: function() {
    var errors = this.form.validate();
    if (!errors) {
      this.trigger('save');
    }
    return false;
  }

});


