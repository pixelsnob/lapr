
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

    var product;

    if (this.context.params.id) {
      product = this.store.products.models.find(product => product.id == this.context.params.id);
      if (!product) {
        // not found
        return this.$el.content;
      }
      product = product.toJSON([ 'images', 'makers' ]);
    } else if (this.context.params.product) {
      product = this.context.params.product;
    } else {
      // error.........
      return this.$el.content;
    }

    this.$el.innerHTML = require('views/partials/instrument_summary.jade')({ product, markdown });

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

