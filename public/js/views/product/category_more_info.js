/**
 * Product category "more info" link
 * 
 */
import BaseView from 'views/base';
import ContentBlockModel from 'models/content_block';
import content_blocks_view from 'views/content_blocks';
import markdown from 'lib/markdown';
import template from 'template';

export default BaseView.extend({

  events: {
    'click a': 'renderModal'
  },

  initialize: function(opts) {
    this.products = opts.products;
  },

  render: function() {
    var selected_category = this.products.refs.selected_categories.at(0),
      content_block_id = selected_category.get('more_info_content_block');
    if (selected_category && content_block_id) {
      this.$el.html(template.render('partials/product_category_more_info', {
        id: content_block_id
      }));
      content_blocks_view.setElement(this.$el).render();
    }
    return this;
  }

});


