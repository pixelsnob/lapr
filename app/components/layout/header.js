
import events from 'events/app';

export default class {
  
  constructor(params, slots) {
    this.params = params;
    this.slots = slots;
    this.$el = document.createElement('template');
    events.app.once('connected', this.connected, this);
    this.selector = '.header';
  }

  connected($el) {
    events.dom.addEventListener('click', this.selector + '__link', ev => {
      if (ev.target.getAttribute('href')) {
        ev.preventDefault();
        events.app.emit('app:navigate', ev.target.getAttribute('href'));
      }
    });
  }

  render() {
    this.$el.innerHTML = require('views/partials/layout/header.jade')();
    if (this.slots.$search) {
      this.$el.content.querySelector(this.selector + '__site-search').appendChild(this.slots.$search);
    }
    return this.$el.content.cloneNode(true);
  }

  disconnected($el) {
    console.log('?'); // ???????????????????
    events.app.off('connected', this.connected.bind(this));
    events.app.off('disconnected', this.disconnected.bind(this));
  }
}

