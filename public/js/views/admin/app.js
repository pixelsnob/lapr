/**
 * Admin app view
 * 
 */
import BaseView from 'views/base';
import ProductView from 'views/admin/product';
import TagCategoriesView from 'views/admin/lists/tag_categories';
import YoutubeVideosView from 'views/admin/lists/youtube_videos';
import ProductsView from 'views/admin/lists/products';
import ContentBlocksView from 'views/admin/lists/content_blocks';
import ImagesView from 'views/admin/lists/images';
import PagesView from 'views/admin/lists/pages';
import ContentBlocksCollection from 'collections/content_blocks';
import ImagesCollection from 'collections/images';
import PagesCollection from 'collections/pages';

export default BaseView.extend({

  el: 'body',

  events: {
    'click .add-product': 'addProduct',
    'click .edit-tag-categories': 'editTagCategories',
    'click .edit-youtube-videos': 'editYoutubeVideos',
    'click .edit-products': 'editProducts',
    'click .edit-content-blocks': 'editContentBlocks',
    'click .edit-images': 'editImages',
    'click .edit-pages': 'editPages'
  },

  initialize: function(opts) {
    this.products = opts.products;
    this.content_blocks = new ContentBlocksCollection;
    this.content_blocks_deferred = this.content_blocks.fetch();
    this.images = new ImagesCollection;
    this.images_deferred = this.images.fetch();
    this.pages = new PagesCollection;
    this.pages_deferred = this.pages.fetch();
  },

  addProduct: function() {
    var view = new ProductView({
      model: this.model,
      refs: this.products.refs,
      mode: 'add'
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
      collection: this.products.refs.youtube_videos,
      products: this.products
    });
    view.renderModal();
    return true;
  },

  editPages: function() {
    var view = new PagesView({
      collection: this.pages
    });
    view.renderModal();
    view.listenTo(view, 'close', function() {
      view.close();
    });
    return true;
  },

  editProducts: function() {
    var view = new ProductsView({
      collection: this.products
    });
    view.renderModal();
    view.listenTo(view, 'close', function() {
      view.close();
    });
    return true;
  },

  editContentBlocks: function() {
    var obj = this;
    this.content_blocks_deferred.done(function(collection) {
      var view = new ContentBlocksView({
        collection: obj.content_blocks
      });
      view.renderModal();
      view.listenTo(view, 'close', function() {
        view.close();
      });
    });
    return true;
  },

  editImages: function() {
    var obj = this;
    this.images_deferred.done(function(collection) {
      var view = new ImagesView({
        collection: obj.images
      });
      view.renderModal();
      view.listenTo(view, 'close', function() {
        view.close();
      });
    });
    return true;
  },

  editPages: function() {
    var obj = this;
    this.pages_deferred.done(function(collection) {
      var view = new PagesView({
        collection: obj.pages
      });
      view.renderModal();
      view.listenTo(view, 'close', function() {
        view.close();
      });
    });
    return true;
  }

});
