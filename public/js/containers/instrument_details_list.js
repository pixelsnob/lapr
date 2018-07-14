
import InstrumentDetailsContainer from 'containers/instrument_details';
import ProductsNavContainer from 'containers/products_nav';

import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el || document.createElement('template');

    events.once('connected', this.connected.bind(this));
  }
  
  connected($el) {
    window.scrollTo(0, 0);
  }

  render() {

    this.$el.innerHTML = require('views/partials/instrument_details_list.jade')();
    const $ul = this.$el.content.querySelector('.product-details-list');

    this.store.filtered_products.models.forEach(product => {
      const instrument_details_container = new InstrumentDetailsContainer({
        ...this.params,
        product: product.toJSON([ 'images', 'makers', 'youtube_videos' ]),
        status: (product.id == this.params.instrument_id ? 'active' : 'inactive'),
      }, this.store);

      $ul.appendChild(instrument_details_container.render());
    });

    this.products_nav_container = new ProductsNavContainer({
      ...this.params,
      collection: this.store.filtered_products,
      base_path: this.params.base_path + 'instrument/'
    }, this.store);

    const $nav = this.$el.content.querySelector('.products-nav');
    $nav.appendChild(this.products_nav_container.render(true));

    return this.$el.content;
  }
}


