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
      this.listenTo(refs.product_categories, 'add remove change',
        _.bind(this.render, this, false));
      this.listenTo(refs.makers, 'add remove change',
        _.bind(this.render, this, false));
      this.listenTo(refs.filtered_products, 'reset', this.toggleMoreLink);
      this.listenTo(this.collection, 'filtered', this.render);
      var obj = this;
      this.listenTo(this.collection, 'add', function(model) {
        // For highlighting, etc.
        model.is_new = true;
        refs.filtered_products.add(model);
        obj.render();
      });
    },
    
    render: function(append) {
      var fragment = document.createDocumentFragment(),
          obj      = this,
          $results = this.$el.find('.results');
      if (append !== true) {
        $results.empty();
      }
      this.refs.filtered_products.forEach(function(product) {
        var view = new ProductView({
          model:              product,
          products:           obj.collection,
          refs:               obj.refs
        });
        fragment.appendChild(view.render().el);
      });
      $results.append(fragment);
      //console.log('products render');
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

    toggleMoreLink: function() {
      var state = this.refs.filtered_products.state;
      if (state.lastPage == state.currentPage) {
        this.$el.find('.more').hide();
      } else {
        this.$el.find('.more').show();
      }
    }

  });
  
});
