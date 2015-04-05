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
  'views/contact',
  'collections/products',
  'collections/pages',
  'lib/events'
], function(
  BaseView,
  ProductsView,
  ProductsSearchView,
  ProductsTagsSearchView,
  ProductsTextSearchView,
  ProductsTextSearchFormView,
  ProductDetailsView,
  ContactView,
  ProductsCollection,
  PagesCollection,
  global_events
) {
  return BaseView.extend({ 
    
    el: 'body',

    events: {
      'click a.navigate':               'navigate',
      'mouseenter .dropdown':      'showNavDropdown',
      'mouseleave .dropdown':      'hideNavDropdown',
      'click .dropdown':           'hideNavDropdown',
      'click #toggle-site-menu':        'toggleSiteMenu'
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
      // Maybe move this to render()
      this.deferred.done(function() {
        var text_search = new ProductsTextSearchFormView({
          products: obj.products
        });
        obj.$el.find('.text-search').append(text_search.render().el);
      });
      this.listenTo(global_events, 'categories-nav-select', this.hideSiteMenu);
      this.$main = this.$el.find('#main');
    },
    
    showNavDropdown: function(ev) {
      $(ev.currentTarget).addClass('open');
    },

    hideNavDropdown: function(ev) {
      $(ev.currentTarget).removeClass('open');
    },

    navigate: function(ev) {
      var url = $(ev.currentTarget).attr('href');
      this.$el.find('.dropdown.open').removeClass('open');
      Backbone.history.navigate(url, true);
      this.hideSiteMenu();
      return false;
    },
    
    showProductsByCategory: function(category) {
      var obj = this;
      this.deferred.done(function() {
        obj.loadMainView('.products-categories-search', ProductsSearchView);
        obj.products.refs.selected_categories.setFromSlug(category);
        obj.products.filterByCategory();
      });
      return false;
    },
    
    showProductsByTags: function(tags) {
      var obj = this;
      this.deferred.done(function() {
        obj.loadMainView('.products-tags-search', ProductsTagsSearchView);
        obj.products.refs.selected_tags.setFromArray(tags);
        obj.products.filterByTags();
      });
      return false;
    },

    showProductsByTextSearch: function(search) {
      var obj = this;
      this.deferred.done(function() {
        obj.loadMainView('.products-text-search', ProductsTextSearchView);
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
    },

    showContact: function() {
      var view = new ContactView;
      this.loadMainView('.contact', ContactView);
    },

    showSiteMenu: function(ev) {
      this.$el.find('#site-wrapper').addClass('show-nav');
    },

    hideSiteMenu: function(ev) {
      this.$el.find('#site-wrapper').removeClass('show-nav');
    },

    toggleSiteMenu: function(ev) {
      var wrapper = this.$el.find('#site-wrapper');
      if (wrapper.hasClass('show-nav')) {
        wrapper.removeClass('show-nav');
      } else {
        wrapper.addClass('show-nav');
      }
    },
    
    loadMainView: function(class_name, View) {
      if (!this.$main.find(class_name).length) {
        if (this.current_view) {
          this.current_view.close();
        }
        this.current_view = new View({
          products: this.products
        });
        this.$main.html(this.current_view.render().el);
      }
    }
  });
});

