
import ProductCategoriesNavContainer from 'containers/product_categories_nav';

import events from 'events/app';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;
    
    this.$el = document.createElement('template');
    
    events.on('connected', this.connected.bind(this));
  }

  connected($el) {
    window.scrollTo(0, 0);
  }

  render() {

    this.$el.innerHTML = require('views/partials/products_search.jade')();

    const product_categories_nav = new ProductCategoriesNavContainer(
      this.params,
      this.store.product_categories
    );

    this.$el.content.querySelector('.sidebar').appendChild(product_categories_nav.render());
    
    this.$el.content.querySelector('.results-container').innerHTML = '<h2>Instruments Landing Page</h3><p style="font-size:3em">🤔</p>';

    return this.$el.content;

  }
}


