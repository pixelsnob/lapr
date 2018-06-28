
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

    this.$el.innerHTML = require('views/partials/instrument_summary.jade')({
      product,
      markdown,
      //category: this.context.params.category
      base_path: this.context.params.base_path
    });

    // Images container
    if (product.images.length) {
      const images_container = new ImagesContainer({
        ...this.context,
        params: {
          ...this.params,
          images: product.images
        }
      }, this.store);

      const $image = this.$el.content.querySelector('.image');
      if ($image) {
        $image.appendChild(images_container.render());
      }
    }

    return this.$el.content;
  }
}

