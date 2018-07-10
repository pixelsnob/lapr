
import InstrumentDetailsContainer from 'containers/instrument_details';
import NavListContainer from 'containers/nav_list';

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

    const nav_list_container = new NavListContainer({
      ...this.params,
      collection: this.store.filtered_products,
      base_path: this.params.base_path + 'instrument/'
    }, this.store);

    const $nav = this.$el.content.querySelector('.products-nav');
    $nav.appendChild(nav_list_container.render(true));
    
    return this.$el.content;
  }
}


