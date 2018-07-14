
import template from 'lib/template';
import events from 'events/app';
import ProductsNavItemComponent from 'components/products_nav_item';

export default class {
  
  constructor(params, store) {
    this.store = store;
    this.collection = params.collection;
    this.$el = params.$el || document.createElement('template').content;
    this.params = params;

    this.selected_index = null;

    events.once('connected', this.connected.bind(this));
  }

  connected() {
  }

  render() {
    const $ul = document.createElement('ul');

    this.$el.innerHTML = '';
    this.$el.appendChild($ul);

    $ul.innerHTML = ''; 

    this.collection.models.forEach((item, i) => {
      const products_nav_item_component = new ProductsNavItemComponent({
        ...this.params,
        item: item.toJSON(),
        selected: this.params.instrument_id == item.id
      }, this.store);
      $ul.appendChild(products_nav_item_component.render());
    });

    return this.$el;
  }
}

