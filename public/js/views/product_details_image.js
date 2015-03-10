/**
 * Product details large image popup
 * 
 */
define([
  'views/base',
  'views/modal',
  'template'
], function(
  BaseView,
  ModalView,
  template
) {
  
  return BaseView.extend({
    
    events: {
    },

    initialize: function(opts) {
      this.refs = this.model.collection.refs;
    },
    
    render: function() {
      var product        = this.model.toJSON(),
          product_images = this.model.get('images'),
          obj            = this;
      if (product_images.length) {
        product_images = product_images.map(function(image_id) {
          return obj.refs.images.findWhere({ _id: image_id });
        }).map(function(image) {
          return image.toJSON();
        });
        this.$el.html(template.render('partials/product_details_image', {
          product: product,
          images: product_images
        }));
      }
      return this;
    },
    
    renderModal: function(opts) {
      this.render();
      var modal_view = new ModalView;
      modal_view.$el.addClass('product-details-image');
      modal_view.render({
        body: this.$el
      });
      this.listenTo(modal_view, 'hide', this.close);
    }
    
  });
});

