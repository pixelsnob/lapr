
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
      
      console.log(this.context.params);
      this.$el.innerHTML = require('views/partials/product_details_container.jade')({
        product: product_json,
        markdown,
        grid_width: this.context.params.grid_width || 12,
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
      if ($images) {
        $images.appendChild(images_container.render());
      }
    }
    return this.$el.content;
  }
}

