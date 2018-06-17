
import template from 'lib/template';
import events from 'events/app';
import ImageComponent from 'components/image';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }
  
  render() {
    this.$el.innerHTML = template.render('partials/images');
    const $ul = this.$el.content.querySelector('ul.images-list');
    const images = this.context.params.images;
    if (images) {
      images.forEach(image => {
        const image_component = new ImageComponent({
          ...this.context,
          params: {
            ...this.context.params,
            image,
            image_path: '/images/products/'
          }
        }, this.store);
        $ul.appendChild(image_component.render());
      });
    }
    return this.$el.content;
  }
}


