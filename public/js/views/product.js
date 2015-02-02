/**
 * Product item view
 * 
 */
define([
  'views/base',
  'models/product',
  'views/product_details',
  'views/image_onload',
  'template'
], function(
  BaseView,
  ProductModel,
  ProductDetailsView,
  ImageOnloadView,
  template
) {
  
  return BaseView.extend({
    
    tagName: 'li',
    
    events: {
      'click':     'showDetails'
    },

    initialize: function(opts) {
      this.model                = opts.model || new ProductModel;
      this.products             = opts.products;
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      // Important, for memory leaks
      this.listenTo(this.products.refs.filtered_products, 'reset', this.remove);
      this.listenTo(this.products, 'kill', this.remove);
      // Include product admin editor if admin user
      if (window.cms.user) {
        var obj = this;
        require([ 'views/admin/product' ], function(ProductAdminView) {
          var events = {
            'click a.edit': _.bind(obj.edit, obj, ProductAdminView)
          };
          obj.delegateEvents(_.extend(obj.events, events));
        });
      }
      // Update if makers collection has changed
      this.listenTo(this.products.refs.makers, 'add change remove', this.render);
    },
    
    render: function() {
      var product = this.model.toJSON(),
          obj     = this;
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
      this.$el.html(template.render('product_row', { product: product, user: window.cms.user }));
      this.$el.attr('id', this.model.id);
      this.highlightIfChanged();
      var image_onload_view = new ImageOnloadView({
        el: this.$el.find('.thumbnail img')
      });
      return this;
    },
    
    highlightIfChanged: function() {
      if (this.model.is_new || this.model.changedAttributes()) {
        delete this.model.is_new;
        var $product = this.$el.find('.product').addClass('highlight');
        setTimeout(function() {
          $product.removeClass('highlight');
        }, 5000);
      }
    },

    showDetails: function() {
      var view = new ProductDetailsView({ model: this.model });
      view.renderModal();
      return false;
    },

    edit: function(ProductAdminView) {
      var view = new ProductAdminView({
        model:              this.model,
        refs:               this.products.refs,
        mode:               'edit'
      });
      view.renderModal();
      return false;
    }

  });
});

