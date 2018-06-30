
import template from 'lib/template';
import InstrumentSummaryContainer from 'containers/instrument_summary';
import events from 'events/app';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
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
      events.emit('app:refresh');
    });
  }

  render() {
    // Products search container
    const products = this.store.filtered_products;

    this.$el.innerHTML = '<ul class="results"></ul>';

    // Populate products
    const $products = this.$el.content.querySelector('.results');
    const products_json = products.toJSON([ 'images', 'makers' ]).splice(0, 50);

    products_json.forEach(product => {
      const instrument = new InstrumentSummaryContainer({
        params: {
          ...this.context.params,
          product
        }
      }, this.store);
      $products.appendChild(instrument.render());
    });

    return this.$el.content;
  }
}

