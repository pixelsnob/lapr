/**
 * Product category "more info" link and modal
 * 
 */
define([
  'views/base',
  'views/modal'
], function(
  BaseView,
  ModalView
) {
  return BaseView.extend({ 
    
    events: {
      'click a':    'renderModal'
    },
    
    initialize: function(opts) {
      this.products = opts.products;
    },
    
    render: function() {
      this.setElement(template.render('partials/product_category_more_info',
        this.model.toJSON()));
      return this; 
    },
    
    renderModal: function() {
      var modal_view = new ModalView;
      modal_view.$el.addClass('product-category-more-info');
      modal_view.render({
        body: this.$el
      });
      this.listenTo(modal_view, 'close', _.bind(this.trigger, this, 'close'));
    }
    
  });
});


