
import template from 'lib/template';
import events from 'events/app';

import SearchInputContainer from 'containers/search_input';
import NavListContainer from 'containers/nav_list';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el;

    events.once('connected', this.connected.bind(this));
  }

  connected() {
    this.store.products.createProductsIndex();
    this.nav_list_container.render();

    events.on('search-input:keyup', ev => {
      this.store.products.getSearchResults(ev.target.value, 30); // add cache
      this.nav_list_container.onKeyup(ev);
    });
    events.on('search-input:keydown', ev => {
      this.nav_list_container.onKeydown(ev);
    });
    events.on('search-input:blur', ev => {
      this.nav_list_container.close();
    });
  }

  render() {
    this.$el.innerHTML = require('views/partials/products_text_search.jade')();

    this.search_input_container = new SearchInputContainer({
      collection: this.store.filtered_products,
      $el: this.$el.querySelector('.form')
    }, this.store);

    this.search_input_container.render();

    this.nav_list_container = new NavListContainer({
      collection: this.store.filtered_products,
      $el: this.$el.querySelector('.search-results')
    }, this.store);

    return this.$el;
  }

}

