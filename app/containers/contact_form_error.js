
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;
    this.$el = document.createElement('template');
  }

  render() {
    this.$el.innerHTML = `
      <p class="error">Uh-oh. Something bad happened.</p>
    `;
    return this.$el.content;
  }
}

