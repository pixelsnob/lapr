/**
 * Top-level app view
 * 
 */
define([
  'views/base',
  'views/products',
  'views/products/categories_search',
  'views/products/tags_search',
  'views/products/text_search',
  'views/products/text_search_form',
  'views/product/details',
  'views/contact',
  'views/content_blocks',
  'views/index',
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
  ContentBlocksView,
  IndexView,
  ProductsCollection,
  PagesCollection,
  global_events
) {
  return BaseView.extend({ 
    
    el: 'body',

    events: {
      'click a.navigate':          'navigate',
      'mouseenter .dropdown':      'showNavDropdown',
      'mouseleave .dropdown':      'hideNavDropdown',
      'click .dropdown':           'hideNavDropdown',
      'click #toggle-site-menu':   'toggleSiteMenu'
    },
    
    current_view: null,
     
    initialize: function() {
      this.products = new ProductsCollection;
      this.deferred = this.products.fetch();
      this.$main    = this.$el.find('#main');
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
        obj.$el.removeClass('modal-open').end()
          .find('.modal, .modal-backdrop').remove();
      };
      // Maybe move this to render()
      this.deferred.done(function() {
        var text_search = new ProductsTextSearchFormView({
          products: obj.products
        });
        obj.$el.find('.text-search').append(text_search.render().el);
      });
      this.listenTo(global_events, 'categories-nav-select', this.hideSiteMenu);
      this.content_blocks_view = new ContentBlocksView({ el: this.$main });
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
        if (!product) {
          obj.showServerError();
        } else {
          var product_view = new ProductDetailsView({
            model: product,
            refs: obj.products.refs
          });
          // If user landed here directly, .product-details will be populated.
          // If not, continue and show product details modal.
          if (obj.$el.find('.product-details').length) {
            obj.$el.find('.product-details').html(product_view.render().el);
            return;
          }
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
            if (!obj.$el.find('.product-details').length) {
              product_view.renderModal();
            }
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
      if (this.$main.find('.contact').length) {
        var view = new ContactView;
        view.setElement(this.$main);
        view.render();
      } else {
        this.loadMainView('.contact', ContactView);
      }
      this.content_blocks_view.render();
    },

    showIndex: function() {
      if (this.$main.find('.index').length) {
        var view = new IndexView;
        view.setElement(this.$main);
        view.render();
      } else {
        this.loadMainView('.index', IndexView);
      }
      this.content_blocks_view.render();
      
    },
    
    showSiteMenu: function(ev) {
      this.$el.find('#site-wrapper').addClass('show-nav');
    },

    hideSiteMenu: function(ev) {
      this.$el.removeClass('show-nav');
    },

    toggleSiteMenu: function(ev) {
      if (this.$el.hasClass('show-nav')) {
        this.$el.removeClass('show-nav');
      } else {
        this.$el.addClass('show-nav');
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
        return true; 
      }
      return false;
    }
  });
});

