
import EventEmitter from 'events';
import events from 'events/app';

export default class extends EventEmitter {
  
  constructor(params, $el) {
    super();
    this.$el = $el || document.createElement('template');
    events.app.once('connected', this.connected.bind(this));
    this.selector = '.site-search';
    this.input_selector = this.selector + '__input';
  }

  connected($el) {
    //this.$el = $el.querySelector(this.selector); // retarget this.$el
    events.dom.addEventListener('keyup', this.input_selector, ev => {
      this.emit('keyup', ev);
    });
    events.dom.addEventListener('keydown', this.input_selector, ev => {
      this.emit('keydown', ev);
    });
    events.dom.addEventListener('blur', this.input_selector, ev => {
      this.emit('blur', ev);
      ev.target.value = '';
    });
  }

  render() {
    this.$el.innerHTML = require('views/partials/site_search_input.jade')();
    return this.$el.content;
  }

}

