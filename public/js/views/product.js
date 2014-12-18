/**
 * Product item view
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
    
    tagName: 'tr',
    
    events: {
    },
    

    initialize: function(opts) {
      this.model                = opts.model;
      this.refs                 = opts.refs;
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      var obj = this;
      // Keep refs data fresh on the page 
      this.listenTo(this.model.collection, 'change-ref', this.refsChange); 
      // Include product admin editor if admin user
      if (window.cms.user) {
        var obj = this;
        require([ 'views/admin/product' ], function(ProductAdminView) {
          var events = {
            'click a.product': _.bind(obj.edit, obj, ProductAdminView, 'edit')
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

    edit: function(ProductAdminView, mode) {
      var view = new ProductAdminView({
        model:              this.model,
        refs:               this.refs
      });
      view.renderModal({ mode: mode });
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

