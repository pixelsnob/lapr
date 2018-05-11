/**
 * Base form
 * 
 */
import 'backbone_forms';
import Backbone from 'backbone';
import 'lib/form_validators';

export default Backbone.Form.extend({

  initialize: function(opts) {
    Backbone.Form.prototype.initialize.apply(this, arguments);
  }

});


