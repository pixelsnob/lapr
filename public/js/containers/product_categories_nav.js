
import template from 'lib/template';
import ProductCategoryNavItem from 'components/product_category_nav_item';

export default class {
  
  constructor(params, store) {
    this.params = params;
    this.store = store;
    this.$el = document.createElement('template');
  }

  render() {
    this.$el.innerHTML = require('views/partials/product_categories_nav.jade')();
    const $ul = this.$el.content.querySelector('ul');
    this.store.models.forEach(product_category => {
      const product_category_link = new ProductCategoryNavItem({
        ...this.params,
        product_category: product_category.toJSON()
      }, this.store)
      $ul.appendChild(product_category_link.render());
    });
    return this.$el.content;
  }
}
