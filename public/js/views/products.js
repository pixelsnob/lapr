/**
 * Products list view
 * 
 */
define([
  'views/base',
  'views/product'
], function(
  BaseView,
  ProductView
) {
  
  return BaseView.extend({

    events: {
    },

    initialize: function(opts) {
      this.collection = opts.collection;
      this.refs = opts.refs;
      this.setElement(opts.el);
      // Include product admin editor if admin user
      if (window.cms.user) {
        var obj = this;
        require([ 'views/admin/product' ], function(ProductAdminView) {
          var events = {
            'click a.add-product': _.bind(obj.add, obj, ProductAdminView)
          };
          obj.delegateEvents(events);
        });
      }
      this.listenTo(this.collection, 'add', this.render);
    },
    
    render: function() {
      var fragment = document.createDocumentFragment(),
          obj      = this;
      this.collection.forEach(function(product) {
        var view = new ProductView({
          model:              product,
          products:           obj.collection,
          refs:               obj.refs
        });
        fragment.appendChild(view.render().el);
      });
      this.$el.find('tbody').html(fragment);
      return this;
    },
    
    // ?????
    showByCategory: function(slug) {
      var obj = this;
      var products = this.collection.filter(function(product) { 
        return _.some(product.get('categories'), function(id) {
          var category = obj.refs.product_categories.findWhere({ _id: id });
          if (!category) {
            return;
          }
          return category.get('slug') == slug;
        });
      });
      this.render(products);// <<<<<<<<<<<< instead set filtered collection here
      return false;
    },

    add: function(ProductAdminView) {
      var view = new ProductAdminView({
        model:              this.model,
        refs:               this.refs,
        mode:               'add'
      });
      view.renderModal();
      var obj = this;
      // Add to collection if save is successful
      this.listenTo(view, 'save', function(model) {
        obj.collection.add(model);
      });
      return false;
    },


  });
  
});
