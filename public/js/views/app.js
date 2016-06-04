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
  'views/list_nav_links',
  'views/contact',
  'views/index',
  'views/content_panel',
  'views/mobile_menu',
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
  ListNavLinksView,
  ContactView,
  IndexView,
  ContentPanelView,
  MobileMenuView,
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
      'click #show-mobile-menu':   'showMobileMenu'
    },
    
    current_view: null,
     
    initialize: function(opts) {
      this.products = opts.products;
      this.$main    = this.$el.find('#main');
      this.listenTo(global_events, 'categories-nav-select', this.hideSiteMenu);
      this.listenTo(global_events, 'set-page-title', this.setPageTitle);
      this.listenTo(global_events, 'show-content-panel', this.showContentPanel);
    },

    render: function() { 
      var obj = this;
      this.products.deferred.done(function() {
        var text_search_view = new ProductsTextSearchFormView({
          products: obj.products,
          input_id: 'text-search'
        });
        obj.$el.find('header .text-search').append(text_search_view.render().el);
        obj.mobile_menu_view = new MobileMenuView({
          products: obj.products
        });
        obj.mobile_menu_view.render();
      });
    },

    showMobileMenu: function(ev) {
      var obj = this;
      this.products.deferred.done(function() {
        obj.mobile_menu_view.show();
      });
    },

    hideMobileMenu: function(ev) {
      var obj = this;
      this.products.deferred.done(function() {
        obj.mobile_menu_view.hide();
      });
    },

    toggleSiteMenu: function(ev) {
      if (this.$el.hasClass('show-nav')) {
        this.$el.removeClass('show-nav');
      } else {
        this.$el.addClass('show-nav');
      }
    },
    
    showNavDropdown: function(ev) {
      $(ev.currentTarget).addClass('open');
    },

    hideNavDropdown: function(ev) {
      $(ev.currentTarget).removeClass('open');
    },
    
    setPageTitle: function(content) {
      if (!content) {
        content = 'Los Angeles Percussion Rentals - Rent Percussion Instruments ' +
                  'in L.A. and Southern California';
      } else {
        content += ' - Los Angeles Percussion Rentals';
      }
      $('title').text(content);
    },

    navigate: function(ev) {
      var url = $(ev.currentTarget).attr('href');
      this.$el.find('.dropdown.open').removeClass('open');
      Backbone.history.navigate(url, true);
      this.hideMobileMenu();
      return false;
    },
    
    showProductsByCategory: function(category) {
      var obj = this;
      this.products.deferred.done(function() {
        obj.loadMainView('products-categories-search', ProductsSearchView);
        obj.products.refs.selected_categories.setFromSlug(category);
        obj.products.filterByCategory();
      });
      return false;
    },
    
    showProductsByTags: function(tags) {
      var obj = this;
      this.products.deferred.done(function() {
        obj.loadMainView('products-tags-search', ProductsTagsSearchView);
        obj.products.refs.selected_tags.setFromArray(tags);
        obj.products.filterByTags();
      });
      return false;
    },

    showProductsByTextSearch: function(search) {
      var obj = this;
      this.products.deferred.done(function() {
        obj.loadMainView('products-text-search', ProductsTextSearchView);
        obj.products.filterByTextSearch(search);
      });
      return false;
    },
    
    showProductDetails: function(product_id, hide_nav) {
      var obj = this;
      this.showMain();
      this.products.deferred.done(function() {
        var product = obj.products.findWhere({ _id: Number(product_id) });
        if (!product) {
          return obj.showServerError();
        }
        var product_view = new ProductDetailsView({
          model: product,
          refs: obj.products.refs
        });
        if (obj.$main.find('.product-details').length) {
          product_view.setElement(obj.$main.find('.product-details'));
          product_view.render();
        } else {
          var list_nav_view = new ListNavLinksView({
            collection:     obj.products.refs.filtered_products,
            model:          product,
            label:          'Instrument',
            base_url_path:  '/instruments/'
          });
          obj.showContentPanel(product_view, list_nav_view, hide_nav);
        }
      });
      return false;
    },

    showContentPanel: function(content_view, list_nav_view, hide_nav) {
      var clearKeydowns = function() {
        $(window).off('keydown.content-panel');
        global_events.off('disable-window-keydowns');
        global_events.off('enable-window-keydowns');
      };
      // In case handlers from previous content panels were not cleared, clear
      // them here
      clearKeydowns();
      this.disableDocumentScroll();
      // Get rid of existing
      if (this.content_panel_view) {
        this.content_panel_view.remove();
      }
      this.content_panel_view = new ContentPanelView;
      // Render content_view inside content panel
      this.$el.prepend(
        this.content_panel_view.render(
          content_view.render().el
        ).el
      );
      // Attach keydown handlers
      var bound_content_panel_keydown = _.bind(this.content_panel_view.onKeydown,
        this.content_panel_view);
      $(window).on('keydown.content-panel', bound_content_panel_keydown);
      // List navigation ("previous", "next", etc.)
      if (list_nav_view) {
        var bound_list_nav_keydown = _.bind(list_nav_view.onKeydown, list_nav_view);
        if (!hide_nav) {
          this.content_panel_view.setNav(list_nav_view.render().el);
          $(window).on('keydown.content-panel', bound_list_nav_keydown);
        } else {
          this.content_panel_view.clearNav();
          $(window).off('keydown.content-panel', bound_list_nav_keydown);
        } 
      }
      // Keydown handler enable/disable, for admin modals, etc.
      global_events.on('disable-window-keydowns', function() {
        if (list_nav_view) {
          list_nav_view.disableKeydowns();
        }
        obj.content_panel_view.disableKeydowns();
      });
      global_events.on('enable-window-keydowns', function() {
        if (list_nav_view) {
          list_nav_view.enableKeydowns();
        }
        obj.content_panel_view.enableKeydowns();
      });
      
      // Cleanup -- on panel hide
      var obj = this;
      this.content_panel_view.on('hidden', function() {
        clearKeydowns();
        obj.enableDocumentScroll();
        if (obj.content_panel_view) {
          obj.content_panel_view.close();
          obj.content_panel_view = null;
        }
        if (list_nav_view) {
          list_nav_view.close();
        }
        content_view.close();
        Backbone.history.back();
      });

    },

    showContact: function() {
      this.loadMainView('contact', ContactView);
    },

    showIndex: function() {
      this.loadMainView('index', IndexView);
    },
    
    showMain: function() {
      this.$main.fadeIn(1000);
    },
    
    disableDocumentScroll: function() {
      document.documentElement.style.overflow = 'hidden'; // firefox, chrome
      document.body.scroll = 'no'; // ie
    },

    enableDocumentScroll: function() {
      document.documentElement.style.overflow = 'visible';
      document.body.scroll = 'yes';
    },

    // Loads a view into #main
    loadMainView: function(class_name, View) {
      if (this.content_panel_view) {
        this.content_panel_view.hide();
        this.content_panel_view = null;
      }
      this.$el.removeClass().addClass(class_name);
      if (!(this.current_view instanceof View)) {
        if (this.current_view) {
          this.current_view.close(); 
        }
        this.current_view = new View({
          products: this.products
        });
        this.$main.html(this.current_view.render().el);
      }
      this.showMain();
      return false;
    }
  });
});

