/**
 * Product item view
 * 
 */

import BaseView from 'views/base';
import ProductModel from 'models/product';
import ProductDetailsView from './product/details';
import ImageOnloadView from './image_onload';
//import ProductAdminView from 'views/admin/product';
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
    this.listenTo(this.products.refs.makers, 'add change remove', this.render);
  },
  
  render: function() {
    var product = this.model.toJSON(),
      obj   = this;
    product.id  = this.model.id;
    if (product.makers) {
      product.makers = product.makers.map(function(maker) {
      var maker = obj.products.refs.makers.findWhere({ _id: maker }); 
      if (maker && maker.attributes) {
        return maker.toJSON();
      }
      return [];
      });
    }
    this.$el.html(template.render('partials/product', {
      product: product
    }));
    this.$el.attr('id', this.model.id);
    // Image loading stuff
    var image = this.model.get('image');
    if (image) {
      var $img = this.$el.find('.image');
      var image_onload_view = new ImageOnloadView({
        el:       $img,
        src:      $img.find('img').attr('src'),
        random_delay: false
      });
      image_onload_view.render();
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

