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
      this.makers               = opts.makers;
      this.product_categories   = opts.product_categories;
      this.tags                 = opts.tags;
      this.tag_categories       = opts.tag_categories;
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
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
    
    render: function(model) {
      model = model || this.model;
      var id      = model.id,
          product = model.toJSON(),
          obj     = this;
      product.id  = id;
      if (product.makers) {
        product.makers = product.makers.map(function(maker) {
          var maker = obj.makers.findWhere({ _id: maker });
          if (maker && maker.attributes) {
            return maker.attributes;
          }
        });
      }
      this.$el.html(template.render('product_row', { product: product }));
      return this;
    },

    edit: function(ProductAdminView, mode) {
      var view = new ProductAdminView({
        model:              this.model,
        makers:             this.makers,
        product_categories: this.product_categories,
        tags:               this.tags,
        tag_categories:     this.tag_categories
      });
      view.renderModal({ mode: mode });
      return false;
    }
    
  });
});

