
import template from 'lib/template';
import ProductCategoryItemContainer from 'containers/product_category_item';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;
    this.$el = document.createElement('template');
  }

  render() {
    this.$el.innerHTML = require('views/partials/product_subcategory_instruments.jade')();
    const $ul = this.$el.content.querySelector('.product-subcategories');

    if (Array.isArray(this.params.product_categories) && this.params.product_categories.length) {
      this.params.product_categories.forEach(product_category => {

        const products = this.store.products.models.filter(product => {
          const product_category_ids = Array.from(product.get('categories'));
          return product_category_ids.includes(product_category.id);
        });

        const product_subcategory_item_container = new ProductCategoryItemContainer({
          ...this.params,
          product_category,
          products: products,
          limit: this.params.product_categories.length > 1 ? 14 : null
        }, this.store);

        $ul.appendChild(product_subcategory_item_container.render());
      });
    }

    return this.$el.content;
  }
}


