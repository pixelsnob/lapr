
import template from 'lib/template';
import events from 'events/app';
import uniqid from 'uniqid';

export default class {
  
  constructor(params, slots = {}) {
    this.params = params;
    this.slots = slots;
    this.$el = document.createElement('template');
    events.app.once('connected', this.connected, this);
    this.id = uniqid();
  }
  
  connected($el) {
    events.dom.addEventListener('click', `#${this.id} a`, ev => {
      if (ev.target.hasAttribute('href')) {
        ev.preventDefault();
        events.app.emit('app:navigate', ev.target.getAttribute('href'));
      }
    });
  }

  render() {
    this.$el.innerHTML = require('views/partials/index.jade')({
      id: this.id
    });
    return this.$el.content.cloneNode(true);
  }
}


