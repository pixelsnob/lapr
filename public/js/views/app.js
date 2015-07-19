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
  'views/content_panel',
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
  ContentPanelView,
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
     
    initialize: function(opts) {
      this.products = opts.products;
      this.$main    = this.$el.find('#main');
      this.content_blocks_view = new ContentBlocksView({ el: this.$main });
      // move site menu to its own view
      this.listenTo(global_events, 'categories-nav-select', this.hideSiteMenu);
      this.content_panel_view = new ContentPanelView;
      // Remove modals on browser "back"
      //window.onpopstate = function(ev) {
      //  obj.$el.removeClass('modal-open').end()
      //    .find('.modal, .modal-backdrop').remove();
      //};
    },

    render: function() {
      this.$el.prepend(this.content_panel_view.render().el);
      var obj = this;
      this.products.deferred.done(function() {
        var text_search = new ProductsTextSearchFormView({
          products: obj.products
        });
        obj.$el.find('.text-search').append(text_search.render().el);
      });
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
      this.products.deferred.done(function() {
        obj.loadMainView('.products-categories-search', ProductsSearchView);
        obj.products.refs.selected_categories.setFromSlug(category);
        obj.products.filterByCategory();
        obj.content_panel_view.hide();
      });
      return false;
    },
    
    showProductsByTags: function(tags) {
      var obj = this;
      this.products.deferred.done(function() {
        obj.loadMainView('.products-tags-search', ProductsTagsSearchView);
        obj.products.refs.selected_tags.setFromArray(tags);
        obj.products.filterByTags();
        obj.content_panel_view.hide();
      });
      return false;
    },

    showProductsByTextSearch: function(search) {
      var obj = this;
      this.products.deferred.done(function() {
        obj.loadMainView('.products-text-search', ProductsTextSearchView);
        obj.products.filterByTextSearch(search);
        obj.content_panel_view.hide();
      });
      return false;
    },

    showProductDetails: function(product_id, previous_url) {
      var obj = this;
      this.products.deferred.done(function() {
        var product = obj.products.findWhere({ _id: Number(product_id) });
        if (!product) {
          obj.showServerError();
        } else {
          var product_view = new ProductDetailsView({
            model: product,
            refs: obj.products.refs
          });
          if (obj.$main.find('.product-details').length) {
            // This was loaded from the server and is displayed directly on
            // the page, so let's add some functionality
            product_view.setElement(obj.$main.find('.product-details'));
            product_view.render();
          } else {
            // This doesn't exist so render() and display in the content panel
            obj.content_panel_view.render(product_view.render().el);
            obj.content_panel_view.show();
            obj.listenTo(obj.content_panel_view, 'hidden', function() {
              Backbone.history.navigate(previous_url, { trigger: false });
              obj.stopListening(obj.content_panel_view);
            });
          }
        }
      });
      return false;
    },

    showContact: function() {
      this.loadMainView('.contact', ContactView);
      this.content_blocks_view.render();
      this.content_panel_view.hide();
    },

    showIndex: function() {
      this.loadMainView('.index', IndexView);
      this.content_blocks_view.render();
      this.content_panel_view.hide();
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
        // This view is currently not being displayed, so make it the current
        // view
        if (this.current_view) {
          this.current_view.close();
        }
        this.current_view = new View({
          products: this.products
        });
        this.$main.html(this.current_view.render().el);
      } else {
        // This view is already being displayed on the page, probably via first
        // page load (the user hit the url for this view directly and it loaded
        // from the server)
        var view = new View({ products: this.products });
        view.setElement(this.$main);
        view.render();
      }
      return false;
    }
  });
});

