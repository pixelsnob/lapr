/**
 * Text search product item view
 * 
 */
import BaseView from 'views/base';
import ProductModel from 'models/product';
import ImageOnloadView from 'views/image_onload';
import template from 'template';
import global_events from 'lib/events';
  
export default BaseView.extend({
  
  tagName: 'li',
  
  events: {
    'click':   'onClick'
  },

  initialize: function(opts) {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },
  
  render: function() {
    var product = this.model.toJSON();
    product.id  = this.model.id;
    product.makers = this.model.getRefs('makers').toJSON();
    this.$el.html(template.render('partials/product_small', {
      product: product
    }));
    return this;
  },
  
  highlight: function() {
    var $product = this.$el.find('.product').addClass('highlight'); 
    setTimeout(function() {
      $product.removeClass('highlight');
    }, 5000);
  },
  
  onClick: function(ev) {
    Backbone.history.navigate(
      `/instruments/${this.model.get('slug')}/${this.model.id}?nav=0`,
      { trigger: true }
    );
    this.trigger('selected');
    return false;
  }

});

