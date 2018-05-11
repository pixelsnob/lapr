/**
 * Contact page view
 * 
 */
import BaseView from 'views/base';
import content_blocks_view from 'views/content_blocks';
import template from 'template';
import global_events from 'lib/events';

export default BaseView.extend({

  form: null,

  //model: new ContactModel,

  events: {
    //'click .send':     'send'
  },

  initialize: function(opts) {
    //this.setElement(template.render('partials/contact'));
  },

  render: function() {
    content_blocks_view.setElement(this.$el).render();
    //global_events.trigger('set-page-title', this.getTitleTag());
    return this;
  },

  getTitleTag: function() {
    return 'Contact Us';
  },

  onClose: function() {
    this.model.unbind();
    this.form.unbind();
  }

});

