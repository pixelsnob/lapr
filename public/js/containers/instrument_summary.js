
import template from 'lib/template';
import events from 'events/app';
import markdown from 'lib/markdown';
//import ImagesContainer from 'containers/images';

export default class {
  
  constructor(params, store, $el) {
    this.params = params;
    this.store = store;
    this.$el = $el || document.createElement('template');
    
    //events.once('connected', this.connected.bind(this));
  }

  /*connected() {
    }
  }*/

  render() {

    const product = this.params.product;

    if (!product) {
      return { error: 'product not found in params' };
    }

    this.$el.innerHTML = require('views/partials/instrument_summary.jade')({
      product,
      markdown,
      base_path: this.params.base_path
    });

    // Images container
    /*if (product.images.length) {
      const images_container = new ImagesContainer({
        ...this.params,
        images: product.images,
        display: 'crop-blur'
      }, this.store);

      const $image = this.$el.content.querySelector('.image');

      if ($image) {
        $image.appendChild(images_container.render());
      }
    }*/

    return this.$el.content;
  }
}
