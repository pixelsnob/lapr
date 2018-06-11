
import template from 'lib/template';
import events from 'events/app';
import ProductsTextSearchItemComponent from 'components/products_text_search_item';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
  }

  connected($el) {
    const $input = $el.querySelector('#search1');
    $input.addEventListener('keyup', ev => this.keyup(ev, $el));
    $input.addEventListener('blur', ev => this.blur(ev, $el));
  }

  keyup(ev, $el) {
    const products = this.store.products.getSearchResults(ev.target.value, 50); // limit?
    const $results_ul = $el.querySelector('.products-text-search .products-list ul');
    // show ^^^
    if ($results_ul.childNodes.length) {
      $results_ul.innerHTML = '';
    }
    console.log(this.context);
    products.map(product => {
      const products_text_search_item_component = new ProductsTextSearchItemComponent(
        { params: { product: product.toJSON() }},
        this.store
      );
      $results_ul.appendChild(products_text_search_item_component.render());
    });
  }

  blur(ev) {
    // hide list
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

