
import template from 'lib/template';
import events from 'events/app';
import ContactFormComponent from 'components/contact_form';
import ContactFormSuccessComponent from 'components/contact_form_success';
import ContactFormErrorComponent from 'components/contact_form_error';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
    this.$el = document.createElement('template');

    events.once('connected', this.connected.bind(this));


    this.contact_form_component = new ContactFormComponent(this.context, this.store);
    this.contact_form_success_component = new ContactFormSuccessComponent(this.context, this.store);
    this.contact_form_error_component = new ContactFormErrorComponent(this.context, this.store);
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
    this.$el.innerHTML = template.render('partials/contact', {});
    this.$el.content.querySelector('.form').appendChild(this.contact_form_component.render());
    return this.$el.content;
  }
}

