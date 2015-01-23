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
      'click .more':     'getMore'
    },

    initialize: function(opts) {
      this.collection = opts.collection;
      var refs = this.refs = this.collection.refs;
      this.setElement(opts.el);
      // Include product admin editor if admin user
      var obj = this;
      if (window.cms.user) {
        require([ 'views/admin/product' ], function(ProductAdminView) {
          /*var events = {
            'click a.add-product': _.bind(obj.add, obj, ProductAdminView)
          };
          obj.delegateEvents(_.extend(obj.events, events));*/
          $('.add-product').on('click', _.bind(obj.add, obj, ProductAdminView));
        });
      }
      this.listenTo(refs.product_categories, 'add remove change',
        _.bind(this.render, this, false));
      this.listenTo(refs.makers, 'add remove change',
        _.bind(this.render, this, false));
      this.listenTo(refs.filtered_products, 'reset', this.toggleMoreLink);
    },
    
    render: function(append) {
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
      if (append === true) {
        this.$el.find('.results').append(fragment);
      } else {
        this.$el.find('.results').html(fragment);
      }
      return this;
    },
    
    getPreviousPage: function(ev) {
      if (this.refs.filtered_products.state.currentPage > 0) {
        this.refs.filtered_products.getPreviousPage();
        this.render();
      }
      return false;
    },

    getNextPage: function() {
      var state = this.refs.filtered_products.state;
      if (state.currentPage + 1 < state.totalPages) {
        this.refs.filtered_products.getNextPage();
        this.render();
      }
      return false;
    },

    getMore: function() {
      var state = this.refs.filtered_products.state;
      if (state.currentPage + 1 < state.totalPages) {
        this.refs.filtered_products.getNextPage();
        this.render(true);
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
      //console.log('filterProductsByCat');
    },
    
    toggleMoreLink: function() {
      var state = this.refs.filtered_products.state;
      if (state.lastPage == state.currentPage) {
        this.$el.find('.more').hide();
      } else {
        this.$el.find('.more').show();
      }
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
      return true; // true so that BS dropdown closes
    }

  });
  
});
