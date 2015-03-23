/**
 * Top-level app view
 * 
 */
define([
  'views/base',
  'views/products',
  'views/products_search',
  'views/products_tags_search',
  'views/products_text_search',
  'views/products_text_search_form',
  'views/product_details',
  'collections/products',
  'collections/pages'
], function(
  BaseView,
  ProductsView,
  ProductsSearchView,
  ProductsTagsSearchView,
  ProductsTextSearchView,
  ProductsTextSearchFormView,
  ProductDetailsView,
  ProductsCollection,
  PagesCollection
) {
  return BaseView.extend({ 
    
    el: 'body',

    events: {
      'click nav li a.navigate': 'navigate'
    },

    current_view: null,
    
    initialize: function() {
      this.products = new ProductsCollection;
      this.deferred = this.products.fetch();
      var obj = this;
      if (window.lapr.user) {
        require([ 'views/admin/app' ], function(AdminApp) {
          new AdminApp({
            el: obj.$el,
            products: obj.products
          });
        });
      }
      // Remove modals on browser "back"
      window.onpopstate = function(ev) {
        obj.$el.removeClass('modal-open').end().find('.modal').remove();
      };
      this.deferred.done(function() {
        var text_search = new ProductsTextSearchFormView({
          products: obj.products });
        obj.$el.find('.text-search').append(text_search.render().el);
      });
    },
    
    navigate: function(ev) {
      var url = $(ev.currentTarget).attr('href'),
          $dd = $(ev.currentTarget).parents('.dropdown-menu');
      if ($dd.length) {
        $dd.prev('.dropdown-toggle').dropdown('toggle');
      }
      Backbone.history.navigate(url, true);
      return false;
    },
    
    showProductsByCategory: function(category) {
      var obj = this;
      this.deferred.done(function() {
        if (!obj.$el.find('#main .products-categories-search').length) {
          if (obj.current_view) {
            obj.current_view.close();
          }
          obj.current_view = new ProductsSearchView({
            products: obj.products
          });
          obj.$el.find('#main').html(obj.current_view.render().el);
        }
        obj.products.refs.selected_categories.setFromSlug(category);
        obj.products.filterByCategory();
      });
      return false;
    },
    
    showProductsByTags: function(tags) {
      var obj = this;
      this.deferred.done(function() {
        if (!obj.$el.find('#main .products-tags-search').length) {
          if (obj.current_view) {
            obj.current_view.close();
          }
          obj.current_view = new ProductsTagsSearchView({
            products: obj.products
          });
          obj.$el.find('#main').html(obj.current_view.render().el);
        }
        obj.products.refs.selected_tags.setFromArray(tags);
        obj.products.filterByTags();
      });
      return false;
    },

    showProductsByTextSearch: function(search) {
      var obj = this;
      this.deferred.done(function() {
        if (!obj.$el.find('#main .products-text-search').length) {
          if (obj.current_view) {
            obj.current_view.close();
          }
          obj.current_view = new ProductsTextSearchView({
            products: obj.products
          });
          obj.$el.find('#main').html(obj.current_view.render().el);
        }
        obj.products.filterByTextSearch(search);
      });
      return false;
    },

    // Shows product details as a modal, and "underneath" we show the 
    // products list showing the first category the product belongs to
    showProductDetails: function(product_id, previous_url) {
      var obj = this;
      this.deferred.done(function() {
        var product = obj.products.findWhere({ _id: Number(product_id) });
        if (product) {
          var product_view = new ProductDetailsView({
            model: product,
            refs: obj.products.refs
          });
          var cats = product.get('categories');
          if (_.isArray(cats) && cats.length) {
            var category = obj.products.refs.product_categories.findWhere({
              _id: Number(cats[0])
            });
            // Show products in same category if not already on the search page
            if (category && !obj.current_view) {
              obj.showProductsByCategory(category.get('slug'));
            }
            obj.$el.find('.modal').remove();
            product_view.renderModal();
            // Return to previous category view, or load one of the categories
            // this product belongs to
            product_view.on('close', function() {
              var url;
              if (previous_url && previous_url) {
                url = previous_url;
              } else {
                url = '/instruments/categories/' + category.get('slug');
              }
              Backbone.history.navigate(url, { trigger: false });
            });
          }
        }
      });
      return false;
    }

  });
});

