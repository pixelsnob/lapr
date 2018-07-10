
import InstrumentDetailsContainer from 'containers/instrument_details';
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

    const $ul = document.createElement('ul');
    this.$el.innerHTML = '';
    this.$el.content.appendChild($ul);

    $ul.className = 'product-details-list';

    this.store.filtered_products.models.forEach(product => {
      const instrument_details_container = new InstrumentDetailsContainer({
        ...this.params,
        product: product.toJSON([ 'images', 'makers', 'youtube_videos' ]),
        status: (product.id == this.params.instrument_id ? 'active' : 'inactive'),
        data_pathname: `/instruments/${product.get('slug')}/${product.id}`
      }, this.store);

      $ul.appendChild(instrument_details_container.render());
    });
      
    return this.$el.content;
  }
}


