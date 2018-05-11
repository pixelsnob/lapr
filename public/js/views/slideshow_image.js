/**
 * Individual slideshow image
 * 
 */
import BaseView from 'views/base';
import template from 'template';

export default BaseView.extend({

  events: {},

  initialize: function(opts) {
    this.model = opts.model;
  },

  render: function() {
    this.setElement(template.render('partials/slideshow_image', {
      product: this.model.toJSON()
    }));
    return this;
  }

});

