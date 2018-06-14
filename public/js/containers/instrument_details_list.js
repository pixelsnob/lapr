
import InstrumentDetailsContainer from 'containers/instrument_details';
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }
  
  render() {
    const products_list = this.store.filtered_products.models;
    const $ul = document.createElement('ul');
    $ul.className = 'product-details-list';
    this.$el.content.appendChild($ul);
    // check to see if product is in filtered products
    if (products_list.length) {
      products_list.forEach(product => {
        const instrument_details_container = new InstrumentDetailsContainer({
          ...this.context, params: { ...this.context.params, id: product.id } 
        }, this.store);
        const $li = document.createElement('li');
        $li.appendChild(instrument_details_container.render());
        $ul.appendChild($li);
      });
    } else {
      const instrument_details_container = new InstrumentDetailsContainer(
        this.context,
        this.store
      );
      $ul.appendChild(
        instrument_details_container.render()
      );
    }
    return this.$el.content.cloneNode(true);
  }
}


