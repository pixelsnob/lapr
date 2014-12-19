/**
 * Product item view
 * 
 */
define([
  'views/base',
  'models/product',
  'template'
], function(
  BaseView,
  ProductModel,
  template
) {
  
  return BaseView.extend({
    
    tagName: 'tr',
    
    events: {
    },

    initialize: function(opts) {
      this.model                = opts.model || new ProductModel;
      this.refs                 = opts.refs;
      this.products             = opts.products;
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      // Keep refs data fresh on the page 
      this.listenTo(this.products, 'change-ref', this.refsChange); 
      // Include product admin editor if admin user
      if (window.cms.user) {
        var obj = this;
        require([ 'views/admin/product' ], function(ProductAdminView) {
          var events = {
            'click a.product': _.bind(obj.edit, obj, ProductAdminView)
          };
          obj.delegateEvents(events);
        });
      }
    },
    
    render: function() {
      var id      = this.model.id,
          product = this.model.toJSON(),
          obj     = this;
      product.id  = id;
      if (product.makers) {
        product.makers = product.makers.map(function(maker) {
          var maker = obj.refs.makers.findWhere({ _id: maker });
          if (maker && maker.attributes) {
            return maker.attributes;
          }
          return [];
        });
      }
      this.$el.html(template.render('product_row', { product: product }));
      return this;
    },

    edit: function(ProductAdminView) {
      var view = new ProductAdminView({
        model:              this.model,
        refs:               this.refs,
        mode:               'edit'
      });
      view.renderModal();
      return false;
    },

    refsChange: function(model) {
      var ids    = [],
          makers = this.model.get('makers');
      if (_.isArray(makers) && makers.length) {
        ids = ids.concat(makers);
      }
      if (_.contains(ids, model.id)) {
        this.render();
      }
      
    }
    
  });
});

