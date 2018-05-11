/**
 * Product text search form
 * 
 */
import BaseForm from 'forms/base';

var c = 1;

export default BaseForm.extend({

  initialize: function(opts) {
    this.schema = {};
    this.schema['search' + c] = {
      type: 'Text',
      title: ''
    };
    BaseForm.prototype.initialize.apply(this, opts);
    c++;
  }

});


