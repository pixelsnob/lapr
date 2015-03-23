/**
 * Product details more_info popup
 * 
 */
define([
  'views/base',
  'views/modal',
  'template',
  'lib/markdown'
], function(
  BaseView,
  ModalView,
  template,
  markdown
) {
  
  return BaseView.extend({
    
    events: {
    },

    initialize: function(opts) {
      this.refs = this.model.collection.refs;
    },
    
    render: function() {
      var product = this.model.toJSON();
      product.more_info = markdown(product.more_info);
      this.$el.html(template.render('partials/product_details_more_info', {
        product: product
      }));
      return this;
    },
    
    renderModal: function(opts) {
      this.render();
      var modal_view = new ModalView;
      modal_view.$el.addClass('product-details-more-info');
      modal_view.render({
        body: this.$el
      });
      this.listenTo(modal_view, 'close', _.bind(this.trigger, this, 'close'));
    },

    close: function() {
      BaseView.prototype.close.apply(this, arguments);      
      this.trigger('modal-close');
    }

  });
});

