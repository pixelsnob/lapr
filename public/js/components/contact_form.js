
import template from 'lib/template';
import events from 'events/app';
import csrf from 'lib/csrf';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
    this.events = events;
    this.$el = document.createElement('template');

    events.once('connected', this.connected.bind(this));
  }

  connected($el) {

    // Contact form submit handler, form validation
    events.registerDomEvent('click', 'contact:send', ev => {
      ev.stopPropagation();
      ev.preventDefault();

      // Validate
      const field_names = [ 'name', 'email', 'phone', 'comments' ];
      const valid_flags = field_names.map(field_name => {

        const $field = $el.querySelector(`[name="${field_name}"]`);
        const $field_error = $el.querySelector(`[data-error="${field_name}"]`);

        $field.className = '';
        $field_error.innerText = '';

        if (!$field.validity.valid) {
          $field.className = 'error';
          if ($field.validity.valueMissing && $field.required) {
            $field_error.innerText = 'Required';
          } else if ($field.type == 'email' && $field.validity.typeMismatch) {
            $field_error.innerText = 'Email address is not valid';
          }
        }
        return $field.validity.valid;
      });

      // Save
      if (valid_flags.every(valid => valid)) {
        const contact = new this.store.Contact;

        field_names.forEach(field_name => {
          const field_value = $el.querySelector(`[name="${field_name}"`).value;
          contact.set(field_name, field_value);
        });

        contact.set('_csrf', csrf.getParam());

        contact.save().then(() => {
          events.emit('contact-form:success', contact.toJSON());
        }).catch(err => {
          events.emit('contact-form:error', err.message);
        });
      }
    });
  }

  render() {
    this.$el.innerHTML = require('views/partials/contact_form.jade')();
    return this.$el.content;
  }
}

