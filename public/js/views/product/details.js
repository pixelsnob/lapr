/**
 * Product details view
 * 
 */
import Backbone from 'backbone';
import BaseView from 'views/base';
import ProductDetailsImageView from './details_image';
import YoutubePlayerView from 'views/youtube_player';
import RangeView from './range';
import ImageOnloadView from 'views/image_onload';
import ProductAdminView from 'views/admin/product';
import content_blocks_view from 'views/content_blocks';
import template from 'template';
import global_events from 'lib/events';
  
export default BaseView.extend({
  
  events: {
    'click .description a': 'navigate'
  },

  initialize: function(opts) {
    this.refs = this.model.collection.refs;
    this.hide_nav = opts.hide_nav;
    // Include product admin editor if admin user
    if (window.lapr.user) {
      import('views/admin/product').then(ProductAdminView => {
        var events = {
          'click a.edit': _.bind(this.edit, this, ProductAdminView.default)
        };
        this.delegateEvents(_.extend(this.events, events));
      });
    }
  },

  render: function() {
    var product = this.model.toJSON();
    product.makers = this.model.getRefs('makers').toJSON().map(maker => maker.name).join(', ');
    product.images = this.model.getRefs('images').toJSON();
    // Render
    this.$el.html(template.render('partials/product_details', {
      product: product
    }));
    // Image loading
    if (product.images.length) {
      var $image = this.$el.find('.image img');
      if ($image.length) {
        var image_onload_view = new ImageOnloadView({
          src: $image.attr('src')
        });
        image_onload_view.load().then(() => {
          $image.show();
        });
      }
    }
    // Youtube videos
    var $youtube_player = this.$el.find('.youtube-player');
    $youtube_player.hide();
    const youtube_videos = this.model.getRefs('youtube_videos');
    if (youtube_videos.length) {
      var yt_view = new YoutubePlayerView({
        collection: youtube_videos
      });
      this.$el.find('.youtube-player').replaceWith(yt_view.render().el);
      $youtube_player.show();
      this.$el.find('.sounds-disclaimer').removeClass('hide');
    }
    // Range notation, if any
    if (product.range && product.range.length) {
      var range_view = new RangeView({ range: product.range });
      this.$el.find('.range').html(range_view.render().el);
    }
    content_blocks_view.setElement(this.$el).render();
    return this;
  },

  navigate: function(ev) {
    if (ev.currentTarget.hostname.search(window.location.hostname) != -1) {
      var url = ev.currentTarget.pathname + ev.currentTarget.search;
      Backbone.history.navigate(url, true);
    } else {
      window.location.href = ev.currentTarget.href;
    }
    return false;
  },

  edit: function(ProductAdminView) {
    var view = new ProductAdminView({
      model:   this.model,
      refs:    this.model.collection.refs,
      mode:    'edit'
    });
    view.renderModal();
    this.listenTo(view, 'save', this.render);
    return false;
  },

  close: function() {
    BaseView.prototype.close.apply(this, arguments);
  }

});

