
import template from 'lib/template';
import HeadContainer from 'containers/head';
import ProductsTextSearchContainer from 'containers/products_text_search';
import events from 'events/app';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
    this.$el = document.createElement('template');

    this.head_container = new HeadContainer(this.context, this.store);

    events.once('connected', this.connected.bind(this));
  }

  connected($el) {
    const products_text_search_container = new ProductsTextSearchContainer(
      this.context,
      this.store
    );
    products_text_search_container.render();
    products_text_search_container.connected(document.body);
  }

  render() {
    if (window.__lapr_ssr && !document.head.attached) {
      document.head.appendChild(this.head_container.render().cloneNode(true));
      document.head.attached = true;
    }
    this.$el.innerHTML = template.render('partials/body');
    return this.$el.content.cloneNode(true);
  }
}

