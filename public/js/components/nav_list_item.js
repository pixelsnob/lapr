
import template from 'lib/template';
import events from 'events/app';
import ProductsTextSearchItemComponent from 'components/products_text_search_item';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
    this.$el = document.createElement('template');
  }

  render() {
    this.$el.innerHTML = '<ul></ul>';
    const $ul = this.$el.content.querySelector('ul');
    const products = this.context.params.products.map(product => {
      const products_text_search_item_component = new ProductsTextSearchItemComponent({
        ...this.context,
        params: {
          ...this.context.params,
          product
        }
      });
      $ul.appendChild(products_text_search_item_component.render());
    });
    this.$el.innerHTML;
    return this.$el.content;
  }
}

