/**
 * Base view
 * 
 */
import Backbone from 'backbone';
import dialog from 'lib/dialog';

export default Backbone.View.extend({
  showServerError: function(model, xhr) {
    /*if (typeof xhr != 'object') {
      dialog.alert('An error has occurred!');
      return;
    }
    if (xhr.status == 403) {
      dialog.alert('You must be logged in to do that...');
    } else {
      dialog.alert('A server error has occurred!');
    }*/
  },

  close: function() {
    if (this.onClose) {
      this.onClose();
    }
    this.remove();
    this.unbind();
  }
});
