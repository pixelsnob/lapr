
import template from 'lib/template';

export default class {
  
  constructor(context, store) {
    this.context = context;
    this.store = store;
    this.$el = document.createElement('template');
  }
  
  getListElementClassName() {
    const filtered_products = this.store.refs.filtered_products.models;
    // Is this tag in the selected_tags collection?
    const is_selected = this.store.refs.selected_tags.models.find(tag => {
      return tag.id == this.context.params.tag._id;
    });
    if (is_selected) {
      return 'selected';
    }
    // Is this tag assigned to at least one product in the products list?
    // Is the products list length 1 or bigger?
    const is_tag_in_filtered_products = filtered_products.find(product => {
      return product.get('tags').includes(this.context.params.tag._id);
    });
    if (!is_tag_in_filtered_products || filtered_products.length <= 1) {
      return 'disabled';
    }
    return '';
  }

  render() {
    this.$el.innerHTML = template.render('partials/tags_nav_item', {
      tag:  this.context.params.tag,
      class_name: this.getListElementClassName()
    });
    return this.$el.content.cloneNode(true);
  }
}
