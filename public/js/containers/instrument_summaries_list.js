
import template from 'lib/template';
import InstrumentSummaryContainer from 'containers/instrument_summary';
import events from 'events/app';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el || document.createElement('template');

  }

  connected($el) {
  }

  render() {
    // Products search container
    this.$el.innerHTML = require('views/partials/instrument_summaries_list.jade')();

    const limit = this.params.limit || 100;

    // Populate products
    const $products = this.$el.content.querySelector('.results');
    const products = this.params.collection.toJSON([ 'images', 'makers' ]).slice(0, limit);

    products.forEach(product => {
      const instrument = new InstrumentSummaryContainer({
        ...this.params,
        product
      }, this.store);
      $products.appendChild(instrument.render());
    });

    return this.$el.content;
  }
}

