/**
 * Products list view
 * 
 */
define([
  'views/base',
  'views/product',
  'masonry'
], function(
  BaseView,
  ProductView,
  Masonry
) {
  
  return BaseView.extend({

    events: {
      'click .more':                   'getMore',
      'click .toggle-sort-direction':  'toggleSortDirection'
    },

    initialize: function(opts) {
      this.collection = opts.collection;
      var refs = this.refs = this.collection.refs;
      this.listenTo(refs.product_categories, 'add remove change', this.render);
      this.listenTo(refs.makers, 'add remove change', this.render);
      this.listenTo(refs.filtered_products, 'filtered', this.render);
      this.listenTo(refs.filtered_products, 'reset sort', this.toggleSortDirectionLink);
      var obj = this;
      this.listenTo(this.collection, 'add', function(model) {
        model.highlight = true;
        refs.filtered_products.add(model);
        // should only be added if in category !?!?!?!
        obj.render();// <<<<<
      });
    },
    
    render: function(append) {
      var $results = this.$el.find('.results'),
          products = this.refs.filtered_products,
          obj      = this;
      if (append !== true) {
        $results.empty();
      }
      products.getPaged().forEach(function(product) {
        var view = new ProductView({
          model:              product,
          products:           obj.collection,
          refs:               obj.refs
        });
        $results.append(view.render().el);
      });
      this.toggleMoreLink();
      // temp
      this.$el.find('.stats').html(products.length + ' Result' +
        (products.length != 1 ? 's' : ''));
      return this;
    },

    getMore: function() {
      var products = this.refs.filtered_products;
      if (products.current_page * products.per_page < products.length) {
        products.next(); 
        this.render(true);
      }
    },

    toggleMoreLink: function() {
      var $more = this.$el.find('.more'),
          products = this.refs.filtered_products;
      if (products.hasMore()) {
        var start = products.getEndIndex() + 1,
            end   = products.getEndIndex() + products.per_page;
        $more.text('Next (' + start + '-' + (end > products.length ?
          products.length : end) + ')');
        $more.show();
      } else {
        $more.hide();
      }
    },

    toggleSortDirection: function() {
      var products   = this.refs.filtered_products;
      if (products.sort_direction == 'asc') {
        products.sort_direction = 'desc';
      } else {
        products.sort_direction = 'asc';
      }
      products.sort()
      products.setPage(1);
      this.render();
    },

    toggleSortDirectionLink: function() {
      var $toggle = this.$el.find('.toggle-sort-direction');
      if (this.refs.filtered_products.sort_direction == 'asc') {
        $toggle.text('Sort Descending'); 
      } else {
        $toggle.text('Sort Ascending'); 
      }
    }

  });
  
});
