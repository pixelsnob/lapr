/**
 * Admin app view
 * 
 */
define([
  'views/base',
  'views/admin/product',
  'views/admin/lists/tag_categories',
  'views/admin/lists/youtube_videos',
  'views/admin/lists/products'
], function(
  BaseView,
  ProductView,
  TagCategoriesView,
  YoutubeVideosView,
  ProductsView
) {
  return BaseView.extend({ 
    
    el: 'body',

    events: {
      'click .add-product':          'addProduct',
      'click .edit-tag-categories':  'editTagCategories',
      'click .edit-youtube-videos':  'editYoutubeVideos',
      'click .edit-products':        'editProducts'
    },

    initialize: function(opts) {
      this.products = opts.products;
    },

    addProduct: function() {
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

    editTagCategories: function() {
      var view = new TagCategoriesView({
        collection: this.products.refs.tag_categories
      });
      view.renderModal();
      return true;
    },

    editYoutubeVideos: function() {
      var view = new YoutubeVideosView({
        collection: this.products.refs.youtube_videos
      });
      view.renderModal();
      return true;
    },

    editPages: function() {
      var view = new PagesView({ collection: this.pages });
      view.renderModal();
      view.listenTo(view, 'close', function() {
        view.close();
      });
      return true;
    },

    editProducts: function() {
      var view = new ProductsView({ collection: this.products });
      view.renderModal();
      view.listenTo(view, 'close', function() {
        view.close();
      });
      return true;
    }
  });
});
