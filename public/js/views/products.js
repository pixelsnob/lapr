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
      this.listenTo(this.refs.filtered_products, 'reset change', this.render);
    },
    
    render: function() {
      var fragment = document.createDocumentFragment(),
          obj      = this;
      //console.log('render');
      this.refs.filtered_products.forEach(function(product) {
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
    
    showAllProducts: function() {
      this.refs.filtered_products.reset(this.collection.models);
    },

    filterProductsByTags: function(slugs) {
      // Get tag _ids from slugs
      var tag_ids = this.refs.tags.filter(function(tag) {
        return _.contains(slugs, tag.get('slug'));
      }).map(function(tag) {
        return tag.get('_id');
      });
      // Filter products by tags
      var products = this.collection.filter(function(product) {
        return _.intersection(tag_ids, product.get('tags')).length; 
      });
      this.refs.filtered_products.reset(products);
      console.log(products.length);
    },

    // ?????
    /*showByCategory: function(slug) {
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
    },*/

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
