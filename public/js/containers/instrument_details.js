
import template from 'lib/template';
import events from 'events/app';
import markdown from 'lib/markdown';
import ImagesContainer from 'containers/images';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }
  
  render() {

    const product = this.params.product;

    if (!product) {
      return { error: 'product not found in params' };
    }

    this.$el.innerHTML = require('views/partials/instrument_details.jade')({
      product,
      markdown,
      status: this.params.status,
      data_pathname: this.params.data_pathname,
      grid_width: this.params.grid_width || 8
    });

    const images_container = new ImagesContainer({
      ...this.params,
      images: product.images
    }, this.store);

    const $images = this.$el.content.querySelector('.images');

    if ($images) {
      $images.appendChild(images_container.render());
    }

    return this.$el.content;
  }
}

