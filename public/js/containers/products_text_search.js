
import template from 'lib/template';
import events from 'events/app';

import SearchInputContainer from 'containers/search_input';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;

    this.$el = $el;

    const params = this.context && this.context.params ? this.context.params : {};

    events.on('connected', this.connected.bind(this));
  }

  connected() {
    this.store.products.createProductsIndex();
  }

  render() {
    if (this.$el.childNodes.length == 0) {
      this.$el.innerHTML = require('views/partials/products_text_search.jade')();
    }
    this.search_input_container = new SearchInputContainer({
      collection: this.store.filtered_products
    }, this.store, this.$el.querySelector('.products-text-search'));

    this.search_input_container.render();
    return this.$el;
  }

}

