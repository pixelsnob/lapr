
import template from 'lib/template';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
    this.$el = document.createElement('template');
  }

  render() {
    const filtered_products = this.store.filtered_products.models;
    const selected_tags = this.store.selected_tags.models;

    var class_name = '';
    var path = '/instruments/tags/';

    const is_selected = selected_tags.find(tag => {
      return tag.id == this.context.params.tag._id;
    });

    if (is_selected) {
      class_name = 'selected';
      // Remove current slug from path
      const slugs = selected_tags.filter(tag => tag.id != this.context.params.tag._id)
      path += slugs.map(tag => tag.get('slug')).join(',');

    } else {
      const is_tag_in_filtered_products = filtered_products.find(product =>
        product.get('tags').includes(this.context.params.tag._id)
      );

      if (!is_tag_in_filtered_products || filtered_products.length <= 1) {
        class_name = 'disabled';
        path = 'javascript:void(0);';
      } else {
        // Add current slug to path
        const slugs = selected_tags.map(tag => tag.get('slug'));
        path += [ ...slugs, this.context.params.tag.slug ].join(',');
      }
    }

    this.$el.innerHTML = template.render('partials/tags_nav_item', {
      tag:  this.context.params.tag,
      class_name,
      path
    });

    return this.$el.content;
  }
}
