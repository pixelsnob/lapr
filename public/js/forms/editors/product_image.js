/**
 * Product images item view
 * 
 * 
 */
import BaseView from 'views/base';
import ImageModel from 'models/image'; 
import template from 'lib/template';

export default BaseView.extend({

  initialize: function(opts) {
    BaseView.prototype.initialize.apply(this, opts);
    this.key = opts.key;
    this.editor_id = opts.editor_id;
    this.model = new ImageModel(opts.image);
  },

  render: function() {
    this.setElement(template.render('admin/product_image', {
      image: this.model.toJSON(),
      name: this.key,
      editor_id: this.editor_id,
      value: this.model.id
    }));
    return this;
  }

});
