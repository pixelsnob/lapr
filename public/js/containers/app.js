
import template from 'lib/template';
import events from 'events/app';
//import navigate from 'navigate';

export default class {
  
  constructor(context, store, slots = {}) {
    this.context = context;
    this.store = store;
    this.slots = slots;
    this.$el = document.createElement('template');
    this.events = events;
    events.once('connected', this.connected.bind(this));
    // add unique id
  }

  render() {
    this.$el.innerHTML = template.render('partials/app');
    if (this.slots.main) {
      this.$el.content.querySelector('#main').appendChild(this.slots.main.render());
    }
    return this.$el.content.cloneNode(true);
  }

  connected($el) {
    console.log('s');
    this.$el.onclick = function() { alert('?'); };
  }
}
