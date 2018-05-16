/**
 * Contact page view
 * 
 */
import BaseView from 'views/base';
import ContactModel from 'models/contact';
import ContactForm from 'forms/contact';
import content_blocks_view from 'views/content_blocks';
import template from 'template';
import global_events from 'lib/events';
import csrf from 'lib/csrf';

export default BaseView.extend({

  form: null,

  model: new ContactModel,

  events: {
    'click .send': 'send'
  },

  initialize: function(opts) {
    this.setElement(template.render('partials/contact'));
  },

  render: function() {
    this.form = new ContactForm({
      model: this.model
    });
    const $form = this.form.render().el;
    this.$el.find('.form').html($form);
    var $button = $('<button>').text('Send').addClass('send');
    this.$el.find('form').append($button);
    content_blocks_view.setElement(this.$el).render();
    $(window).scrollTop(0);
    global_events.trigger('set-page-title', this.getTitleTag());
    return this;
  },

  send: function(ev) {
    var errors = this.form.commit();
    if (!errors) {
      this.model.set('csrf-param', csrf.getParam());
      this.model.save().then(function() {
        this.$el.find('.form').html("Thanks! We'll get back to you shortly.");
        this.model.clear();
      }).catch(this.showServerError);
    }
    return false;
  },

  getTitleTag: function() {
    return 'Contact Us';
  },

  onClose: function() {
    this.model.unbind();
    this.form.unbind();
  }

});

