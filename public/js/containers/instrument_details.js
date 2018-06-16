
import template from 'lib/template';
import events from 'events/app';
import markdown from 'lib/markdown';
import ImagesContainer from 'containers/images';

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
      const product_json = product.toJSON([ 'images', 'makers', 'youtube_videos' ]);
      this.$el.innerHTML = template.render('partials/product_details', {
        product: product_json,
        markdown,
        user: null // <<<<<<<<<<replace me
      });

      // Images container
      const images_container = new ImagesContainer({
        ...this.context,
        params: {
          ...this.params,
          images: product_json.images
        }
      }, this.store);

      const $images = this.$el.content.querySelector('.images');
      $images.appendChild(images_container.render());
    }
    return this.$el.content;
  }
}

