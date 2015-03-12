/**
 * Top-level app view
 * 
 */
define([
  'views/base',
  'views/products',
  'views/products_search',
  'views/products_tags_search',
  'collections/products',
  'collections/pages'
], function(
  BaseView,
  ProductsView,
  ProductsSearchView,
  ProductsTagsSearchView,
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
      // Admin stuff if user is logged in
      var obj = this;
      if (window.lapr.user) {
        require([
          'views/admin/product',
          'views/admin/lists/tag_categories',
          'views/admin/lists/youtube_videos',
          'views/admin/lists/products'
        ],
        function(
          ProductView,
          TagCategoriesView,
          YoutubeVideosView,
          ProductsView
        ) {
          obj.events['click .add-product'] = function() {
            obj.addProduct(ProductView);
          };
          obj.events['click .edit-tag-categories'] = function() {
            obj.editTagCategories(TagCategoriesView);
          };
          obj.events['click .edit-youtube-videos'] = function() {
            obj.editYoutubeVideos(YoutubeVideosView);
          };
          obj.events['click .edit-products'] = function() {
            obj.editProducts(ProductsView);
          };
          obj.delegateEvents(obj.events);
        });
      }
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
          if (this.current_view) {
            this.current_view.close();
          }
          this.current_view = new ProductsSearchView({
            products: obj.products
          });
          obj.$el.find('#main').html(this.current_view.render().el);
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
          if (this.current_view) {
            this.current_view.close();
          }
          this.current_view = new ProductsTagsSearchView({
            products: obj.products
          });
          obj.$el.find('#main').html(this.current_view.render().el);
        }
        obj.products.refs.selected_tags.setFromArray(tags);
        obj.products.filterByTags();
      });
      return false;
    },

    addProduct: function(ProductView) {
      var view = new ProductView({
        model:              this.model,
        refs:               this.products.refs,
        mode:               'add'
      });
      view.renderModal();
      var obj = this;
      // Add to collection if save is successful
      this.listenTo(view, 'save', function(model) {
        obj.products.add(model);
      });
      return true; // true so that BS dropdown closes
    },

    editTagCategories: function(TagCategoriesView) {
      var view = new TagCategoriesView({
        collection: this.products.refs.tag_categories
      });
      view.renderModal();
      return true; // true so that BS dropdown closes
    },

    editYoutubeVideos: function(YoutubeVideosView) {
      var view = new YoutubeVideosView({
        collection: this.products.refs.youtube_videos
      });
      view.renderModal();
      return true; // true so that BS dropdown closes
    },

    editPages: function(PagesView) {
      var view = new PagesView({ collection: this.pages });
      view.renderModal();
      view.listenTo(view, 'close', function() {
        view.close();
      });
      return true; // true so that BS dropdown closes
    },

    editProducts: function(ProductsView) {
      var view = new ProductsView({ collection: this.products });
      view.renderModal();
      view.listenTo(view, 'close', function() {
        view.close();
      });
      return true; // true so that BS dropdown closes
    }

  });
});

