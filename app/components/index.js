
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(params, $el) {
    this.params = params;
    this.$el = $el || document.createElement('template');
    events.app.on('connected', this.connected.bind(this));
  }
  
  connected($el) {
    events.dom.addEventListener('click', '.index__card a', ev => {
      if (ev.target.hasAttribute('href')) {
        ev.preventDefault();
        events.app.emit('app:navigate', ev.target.getAttribute('href'));
      }
    });
  }

  render() {
    this.$el.innerHTML = require('views/partials/index.jade')();
    return this.$el.content;
  }
}


