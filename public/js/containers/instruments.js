
import template from 'lib/template';
import events from 'events/app';

import Instrument from 'components/instrument';
//import ProductCategoriesNav from 'containers/product_categories_nav';

export default class {
  
  constructor(context, store, slots = []) {
    this.context = context;
    this.store = store;
    this.$el = document.createElement('template');

    this.store.refs.filtered_products.reset(this.store.toJSON());
    this.store.refs.selected_categories.setFromSlug(this.context.params.category);
    this.store.filterByCategory();
    this.store.refs.filtered_products.sort_direction = this.context.params.sort_dir;
    this.store.refs.filtered_products.sort();
    
    this.events = events;
    
    this.slots = slots;
    //this.events.once('connected', this.connected.bind(this));
  }

  render() {
    // Products search container
    const products = this.store.refs.filtered_products;
    this.$el.innerHTML = template.render('partials/products_search', {
      products: products.toJSON(),
      context: this.context
    });
    // Populate products
    const $products = this.$el.content.querySelector('.results');
    products.models.forEach(model => {
      const product = model.toJSON([ 'images', 'makers' ]);
      const instrument = new Instrument(this.context, product); 
      $products.appendChild(instrument.render());
    });
    // Sidebar
    if (this.slots.sidebar) {
      this.$el.content.querySelector('.categories').appendChild(this.slots.sidebar.render());
    }
    return this.$el.content.cloneNode(true);
  }

  connected($el) {
  }

}

