
import template from 'lib/template';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }

  render() {
    this.$el.innerHTML = template.render('partials/product_category_link', {
      product_category: this.context.params.product_category
    });
    return this.$el.content.cloneNode(true);
  }
}
