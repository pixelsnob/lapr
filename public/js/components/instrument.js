
import template from 'lib/template';
import navigate from 'navigate';
import events from 'events/app';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
    this.events = events;
    this.events.once('connected', $el => this.connected($el));
  }
  
  connected($el) {
    navigate.attachLinks($el.querySelectorAll('.results .product a[navigate]'));
  }

  render() {
    this.$el.innerHTML = template.render('partials/product', {
      product: this.store
    });
    return this.$el.content.cloneNode(true);
  }
}
