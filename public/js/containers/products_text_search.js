
import template from 'lib/template';
import events from 'events/app';
import ProductsTextSearchListComponent from 'components/products_text_search_list';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
    this.$products_list = null;
  }

  connected($el) {
    this.$input = $el.querySelector('#search1');
    this.$products_list = $el.querySelector('.products-text-search .products-list');
    this.$input.addEventListener('keyup', this.keyup.bind(this));
    this.$input.addEventListener('blur', this.blur.bind(this));
  }

  keyup(ev) {
    const products = this.store.products.getSearchResults(ev.target.value, 50); // limit?
    if (!products.length) {
      this.$products_list.innerHTML = '';
      return null;
    }
    const products_text_search_list_component = new ProductsTextSearchListComponent(
      { ...this.context, params: { products }},
      this.store
    );
    this.$products_list.innerHTML = '';
    this.$products_list.appendChild(products_text_search_list_component.render());
  }

  blur(ev) {
    this.$input.value = '';
    this.$products_list.innerHTML = '';
  }

  render() {
    this.store.products.createProductsIndex();
    const $text_search_container = document.body.querySelector('.text-search');
    if ($text_search_container) {
      $text_search_container.innerHTML = template.render('partials/products_text_search');
    }
    return null;
  }
}

