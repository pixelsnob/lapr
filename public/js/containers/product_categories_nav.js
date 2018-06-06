
import template from 'lib/template';
import ProductCategoryLink from 'components/product_category_link';
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
  }

  render() {
    const $ul = document.createElement('ul');
    this.store.models.forEach(model => {
      const product_category_link = new ProductCategoryLink(null, model)
      $ul.appendChild(product_category_link.render());
    });
    this.$el.content.appendChild($ul);
    return this.$el.content.cloneNode(true);
  }
}
