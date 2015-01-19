/**
 * Products list view
 * 
 */
define([
  'views/base',
  'views/product',
], function(
  BaseView,
  ProductView
) {
  
  return BaseView.extend({

    events: {
      'click .pagination .previous': 'getPreviousPage',
      'click .pagination .next':     'getNextPage'
    },

    initialize: function(opts) {
      this.collection = opts.collection;
      var refs = this.refs = this.collection.refs;
      this.setElement(opts.el);
      // Include product admin editor if admin user
      var obj = this;
      if (window.cms.user) {
        require([ 'views/admin/product' ], function(ProductAdminView) {
          var events = {
            'click a.add-product': _.bind(obj.add, obj, ProductAdminView)
          };
          obj.delegateEvents(_.extend(obj.events, events));
        });
      }
      this.listenTo(this.collection, 'add', function(model) {
        refs.filtered_products.fullCollection.add(model);
      });
      this.listenTo(this.collection, 'change', this.render);
      this.listenTo(refs.product_categories, 'add remove change', this.render);
      this.listenTo(refs.makers, 'add remove change', this.render);
    },
    
    render: function() {
      //console.log('products list render');
      var fragment = document.createDocumentFragment(),
          obj      = this;
      this.refs.filtered_products.forEach(function(product) {
        var view = new ProductView({
          model:              product,
          products:           obj.collection,
          refs:               obj.refs
        });
        fragment.appendChild(view.render().el);
      });
      this.$el.find('.results').html(fragment);
      return this;
    },
    
    getPreviousPage: function(ev) {
      if (this.refs.filtered_products.state.currentPage > 0) {
        this.refs.filtered_products.getPreviousPage();
        this.render();
      }
      return false;
    },

    getNextPage: function(ev) {
      var state = this.refs.filtered_products.state;
      if (state.currentPage + 1 < state.totalPages) {
        this.refs.filtered_products.getNextPage();
        this.render();
      }
      return false;
    },

    filterProductsByTags: function() {
      this.refs.filtered_products.state.currentPage = 0;
      this.collection.filterByTags();
      this.render();
    },
    
    filterProductsByCategory: function() {
      this.refs.filtered_products.state.currentPage = 0;
      this.collection.filterByCategory();
      this.render();
      console.log('filterProductsByCat');
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
    }

  });
  
});
