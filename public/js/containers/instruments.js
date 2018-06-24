
import template from 'lib/template';
import Instrument from 'components/instrument';
import events from 'events/app';

export default class {
  
  constructor(context, store, slots = []) {
    this.context = context;
    this.store = store;
    this.slots = slots;
    this.$el = document.createElement('template');

    events.once('connected', this.connected.bind(this));
  }

  connected($el) {
    events.removeAllListeners('app:scroll');
    events.registerDomEvent('click', 'app:instruments:sort-products', ev => {
      this.store.filtered_products.sort_direction = (
        this.store.filtered_products.sort_direction == 'desc' ?
        'asc' :
        'desc'
      );
      this.store.filtered_products.sort();
      events.emit('app:refresh'); // slow ... add this.render()
    });
  }

  render() {
    // Products search container
    const products = this.store.filtered_products;
    this.$el.innerHTML = require('views/partials/products_search.jade')({
      products_length: products.models.length,
      sort_dir: this.store.filtered_products.sort_direction
    });

    // Populate products
    const $products = this.$el.content.querySelector('.results');
    const products_json = products.toJSON([ 'images', 'makers' ]).splice(0, 50); // <<< this is slow
    products_json.forEach(product => {
      const instrument = new Instrument({
        params: { product }
      }, this.store);
      $products.appendChild(instrument.render());
    });

    // Sidebar
    if (this.slots.sidebar) {
      const $sidebar = this.$el.content.querySelector('.sidebar');
      $sidebar.innerHTML = '';
      $sidebar.appendChild(this.slots.sidebar.render());
    }
    return this.$el.content;
  }
}

