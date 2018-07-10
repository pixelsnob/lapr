
import template from 'lib/template';
import InstrumentSummaryContainer from 'containers/instrument_summary';
import events from 'events/app';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;
    this.$el = document.createElement('template');

    //events.once('connected', this.connected.bind(this));
  }

  connected($el) {
  }

  render() {
    // Products search container
    const products = this.store.filtered_products;

    this.$el.innerHTML = '<ul class="results"></ul>';

    // Populate products
    const $products = this.$el.content.querySelector('.results');
    const products_json = products.toJSON([ 'images', 'makers' ]).slice(0, 100);///////

    products_json.forEach(product => {
      const instrument = new InstrumentSummaryContainer({
        ...this.params,
        product
      }, this.store);
      $products.appendChild(instrument.render());
    });

    return this.$el.content;
  }
}

