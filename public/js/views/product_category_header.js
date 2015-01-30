/**
 * Product category header view
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
      this.listenTo(this.products.refs.selected_categories, 'add', this.render);
    },

    render: function() {
      var selected_category = this.products.refs.selected_categories.at(0);
      console.log(selected_category);
      if (selected_category) {
        this.$el.text(selected_category.get('name'));
      }
      return this;
    }

  });
});

