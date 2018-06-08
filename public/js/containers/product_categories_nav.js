
import template from 'lib/template';
import ProductCategoryNavItem from 'components/product_category_nav_item';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
    this.$el = document.createElement('template');
  }

  render() {
    this.$el.innerHTML = template.render('partials/product_categories_nav');
    const $ul = this.$el.content.querySelector('ul');
    this.store.models.forEach(product_category => {
      const context = {
        ...this.context,
        params: {
          ...this.context.params,
          product_category: product_category.toJSON()
        }
      };
      const product_category_link = new ProductCategoryNavItem(context, this.store)
      $ul.appendChild(product_category_link.render());
    });
    return this.$el.content.cloneNode(true);
  }
}
