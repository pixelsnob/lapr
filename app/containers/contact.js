
import template from 'lib/template';
import events from 'events/app';
import ContactFormContainer from 'containers/contact_form';
import ContactFormSuccessContainer from 'containers/contact_form_success';
import ContactFormErrorContainer from 'containers/contact_form_error';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;
    this.$el = document.createElement('template');

    events.once('connected', this.connected.bind(this));


    this.contact_form_component = new ContactFormContainer(this.params, this.store);
    this.contact_form_success_component = new ContactFormSuccessContainer(this.params, this.store);
    this.contact_form_error_component = new ContactFormErrorContainer(this.params, this.store);
  }
  
  connected($el) {
    events.once('contact-form:success', contact => {
      const $form = $el.querySelector('#contact-form');
      $form.innerHTML = '';
      $form.appendChild(this.contact_form_success_component.render());
    });
    events.once('contact-form:error', error_message => {
      const $form = $el.querySelector('#contact-form');
      $form.innerHTML = '';
      $form.appendChild(this.contact_form_error_component.render());
    });
  }

  render() {
    document.body.className = 'contact'; // <<<<<,
    this.$el.innerHTML = require('views/partials/contact.jade')();
    this.$el.content.querySelector('.form').appendChild(this.contact_form_component.render());
    return this.$el.content;
  }
}

