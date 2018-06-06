
import template from 'lib/template';
import navigate from 'navigate';
import events from 'events/app';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
    this.events = events;
    this.events.once('connected', this.connected.bind(this))
  }
  
  connected($el) {
    navigate.attachLinks($el.querySelectorAll('.sidebar nav .categories a[navigate]'));
  }

  render() {
    this.$el.innerHTML = template.render('partials/product_category_link', {
      product_category: this.store.toJSON()
    });
    return this.$el.content.cloneNode(true);
  }
}
