
import EventEmitter from 'events';
import events from 'events/app';

export default class extends EventEmitter {
  
  constructor(params) {
    super();
    this.$el = document.createElement('template');
    this.selector = '.site-search';
    this.input_selector = this.selector + '__input';
    events.app.once('connected', this.connected, this);
  }

  connected($el) {
    events.dom.addEventListener('keyup', this.input_selector, ev => {
      this.emit('keyup', ev);
    });
    events.dom.addEventListener('keydown', this.input_selector, ev => {
      this.emit('keydown', ev);
    });
    events.dom.addEventListener('blur', this.input_selector, ev => {
      this.emit('blur', ev);
    });
  }

  render() {
    this.$el.innerHTML = require('views/partials/site_search_input.jade')();
    return this.$el.content;
  }

}

