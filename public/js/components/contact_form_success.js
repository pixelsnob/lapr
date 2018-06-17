
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
    this.$el = document.createElement('template');
  }

  render() {
    this.$el.innerHTML = `
      <p>Thanks! We'll get back to you shortly.</p>
    `;
    return this.$el.content;
  }
}

