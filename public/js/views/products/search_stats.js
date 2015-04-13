/**
 * Products search results stats such as count, etc.
 * 
 */
define([
  'views/base',
  'template'
], function(
  BaseView,
  template
) {
  return BaseView.extend({ 
    
    events: {
    },
    
    initialize: function(opts) {
      this.products = opts.products;
      this.listenTo(this.products.refs.filtered_products, 'filtered',
        this.render);
    },

    render: function() {
      var refs     = this.products.refs,
          $stats   = refs.filtered_products.length + ' Result' +
                     (refs.filtered_products.length != 1 ? 's' : '');
      this.$el.html($stats);
      return this;
    }
  });
});
