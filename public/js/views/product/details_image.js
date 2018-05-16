/**
 * Product details large image popup
 * 
 */
import BaseView from 'views/base';
import ModalView from 'views/modal';
import ImageOnloadView from 'views/image_onload';
import template from 'template';

export default BaseView.extend({

  events: {},

  initialize: function(opts) {
    this.refs = this.model.collection.refs;
  },

  render: function() {
    var product = this.model.toJSON(),
      product_image = this.model.get('image');
    if (product_image) {
      this.setElement(template.render('partials/product_details_image', {
        product: product
      }));
      var image_onload_view = new ImageOnloadView({
        el: this.$el,
        src: '/images/products/' + product_image
      });
      image_onload_view.render();
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

