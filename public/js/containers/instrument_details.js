
import template from 'lib/template';
import events from 'events/app';
import markdown from 'lib/markdown';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }
  
  render() {
    const product = this.store.products.models.find(product => {
      return product.id == this.context.params.id
    });
    if (!product) {
      this.$el.innerHTML = '<p class="error">Product not found</p>';
    } else {
      this.$el.innerHTML = template.render('partials/product_details', {
        product: product.toJSON([ 'images', 'makers', 'youtube_videos' ]),
        markdown,
        user: null // <<<<<<<<<<replace me
      });
    }
    return this.$el.content.cloneNode(true);
  }
}


