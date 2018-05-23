/**
 * Product item view
 * 
 */

import BaseView from 'views/base';
import ProductModel from 'models/product';
import ProductDetailsView from './product/details';
import ImageOnloadView from './image_onload';
import template from 'template';
import global_events from 'lib/events';
  
export default BaseView.extend({
  
  tagName: 'li',
  
  events: {
    'click':   'onClick'
  },

  initialize: function(opts) {
    this.model        = opts.model || new ProductModel;
    this.products       = opts.products;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.highlight);
    this.listenTo(this.model, 'destroy', this.remove);
    // Important, for memory leaks
    this.listenTo(this.products.refs.filtered_products, 'reset', this.remove);
    // Include product admin editor if admin user
    if (window.lapr.user) {
      import('views/admin/product').then(ProductAdminView => {
        var events = {
          'click a.edit': _.bind(this.edit, this, ProductAdminView.default)
        };
        this.delegateEvents(_.extend(this.events, events));
      });
    }
    // Update if makers collection has changed
    this.listenTo(this.products.refs.makers, 'add change remove destroy', this.render);
  },
  
  render: function() {
    var product = this.model.toJSON();
    product.id  = this.model.id;
    if (product.makers) {
      product.makers = product.makers.map(maker => {
        var maker = this.products.refs.makers.findWhere({ _id: maker }); 
        if (maker && maker.attributes) {
          return maker.toJSON();
        }
        return null;
      }).filter(maker => maker !== null);
    }
    if (Array.isArray(product.images) && product.images.length) {
      var image = this.products.refs.images.findWhere({ _id: product.images[0] });
      if (image) {
        product.image = image;
      }
    }
    // Image loading stuff
    this.$el.html(template.render('partials/product', {
      product: product
    }));
    var $image = this.$el.find('.image img');
    if (product.image && $image.length) {
      var image_onload_view = new ImageOnloadView({
        src: this.$el.find('.image img').attr('src'),
      });
      image_onload_view.load().then(() => $image.show());
    }
    return this;
  },
  
  highlight: function() {
    var $product = this.$el.find('.product').addClass('highlight'); 
    setTimeout(function() {
      $product.removeClass('highlight');
    }, 5000);
  },
  
  onClick: function(ev) {
    Backbone.history.navigate('/instruments/' + this.model.get('slug') + '/' +
      this.model.id, { trigger: true });
    return false;
  },

  edit: function(ProductAdminView) {
    var view = new ProductAdminView({
      model:        this.model,
      refs:         this.products.refs,
      mode:         'edit'
    });
    view.renderModal();
    return false;
  }

});

