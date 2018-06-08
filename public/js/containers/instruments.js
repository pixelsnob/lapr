
import template from 'lib/template';
import Instrument from 'components/instrument';
import events from 'events/app';

export default class {
  
  constructor(context, store, slots = []) {
    this.context = context;
    this.store = store;
    this.slots = slots;
    this.$el = document.createElement('template');
    events.registerDomEvent('click', 'app:instruments:sort-products', ev => {
      this.store.refs.filtered_products.sort_direction = (
        this.store.refs.filtered_products.sort_direction == 'desc' ?
        'asc' :
        'desc'
      );
      this.store.refs.filtered_products.sort();
      events.emit('app:refresh');

    });
  }

  render() {
    // Products search container
    const products = this.store.refs.filtered_products;
    this.$el.innerHTML = template.render('partials/products_search', {
      products: products.toJSON(),
      sort_dir: this.store.refs.filtered_products.sort_direction
    });
    // Populate products
    const $products = this.$el.content.querySelector('.results');
    products.models.forEach(model => {
      const instrument = new Instrument({
        params: { product: model.toJSON([ 'images', 'makers' ]) }//<
      }, this.store);
      $products.appendChild(instrument.render());
    });
    // Sidebar
    if (this.slots.sidebar) {
      // change .categories to .sidebar 
      const $sidebar = this.$el.content.querySelector('.sidebar');
      $sidebar.innerHTML = '';
      $sidebar.appendChild(this.slots.sidebar.render());
    }
    return this.$el.content.cloneNode(true);
  }

}

