/**
 * Product category "more info" link and modal
 * 
 */
define([
  'views/base'
], function(
  BaseView
) {
  return BaseView.extend({ 
    
    events: {
    },
    
    initialize: function(opts) {
      this.products = opts.products;
      this.listenTo(this.products.refs.selected_categories, 'add reset', this.render);
    },

    render: function() {
      var selected_category = this.products.refs.selected_categories.at(0);
      if (selected_category && selected_category.get('more_info_content_block')) {
        this.$el.removeClass('hide');
        console.log(this.$el);
      } else {
        this.$el.addClass('hide');
      }
      return this;
    }

  });
});

