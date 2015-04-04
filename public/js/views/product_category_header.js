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
      this.listenTo(this.products.refs.selected_categories, 'add reset', this.render);
    },

    render: function() {
      var selected_category = this.products.refs.selected_categories.at(0),
          text              = (selected_category ? selected_category.get('name')
                              : 'All Instruments');
      this.$el.text(text);
      return this;
    }

  });
});

