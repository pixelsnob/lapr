
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

    const product = this.context.params.product;

    if (!product) {
      return { error: 'product not found in context.params' };
    }

    this.$el.innerHTML = require('views/partials/instrument_details.jade')({
      product,
      markdown,
      grid_width: this.context.params.grid_width || 8
    });

    const images_container = new ImagesContainer({
      ...this.context,
      params: {
        ...this.params,
        images: product.images
      }
    }, this.store);

    const $images = this.$el.content.querySelector('.images');

    if ($images) {
      $images.appendChild(images_container.render());
    }

    return this.$el.content;
  }
}

