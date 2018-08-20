
import EventEmitter from 'events';
import events from 'events/app';
import uniqid from 'uniqid';

export default class {
  
  constructor(params) {
    this.params = params;
    this.$el = document.createElement('template');
    this.id = uniqid();
    this.selector = `#${this.id}`;
    events.app.once('connected', this.connected, this);
  }

  connected($el) {
    if (this.params.onKeyup) {
      events.dom.addEventListener('keyup', this.selector, this.params.onKeyup);
    }
    if (this.params.onKeydown) {
      events.dom.addEventListener('keydown', this.selector, this.params.onKeydown);
    }
    if (this.params.onBlur) {
      events.dom.addEventListener('blur', this.selector, this.params.onBlur);
    }
  }

  reset() {
    document.querySelector(this.selector).value = '';
  }

  render() {
    this.$el.innerHTML = require('views/partials/site_search_input.jade')({
      id: this.id
    });
    return this.$el.content.cloneNode(true);
  }

}

