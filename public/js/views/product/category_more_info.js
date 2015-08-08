/**
 * Product category "more info" link
 * 
 */
define([
  'views/base',
  'models/content_block',
  'views/content_blocks',
  'lib/markdown',
  'template'
], function(
  BaseView,
  ContentBlockModel,
  content_blocks_view,
  markdown,
  template
) {
  return BaseView.extend({ 
    
    events: {
      'click a':    'renderModal'
    },
    
    initialize: function(opts) {
      this.products = opts.products;
    },
    
    render: function() {
      var selected_category = this.products.refs.selected_categories.at(0),
          content_block_id  = selected_category.get('more_info_content_block'),
          obj               = this;
      if (selected_category && content_block_id) {
        this.$el.html(template.render('partials/product_category_more_info', {
          id: content_block_id
        }));
        content_blocks_view.setElement(this.$el).render();
      }
      return this; 
    }
    
  });
});


