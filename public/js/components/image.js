
import template from 'lib/template';
import events from 'events/app';

export default class {
  
  constructor(context, store, $el) {
    this.context = context;
    this.store = store;
    this.$el = $el || document.createElement('template');
  }
  
  render() {
    this.$el.innerHTML = template.render('partials/image', {
      image: this.context.params.image,
      image_path: this.context.params.image_path
    });
    return this.$el.content;
  }
}
