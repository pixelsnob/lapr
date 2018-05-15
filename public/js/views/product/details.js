/**
 * Product details view
 * 
 */

import Backbone from 'backbone';
import BaseView from 'views/base';
import ProductDetailsImageView from './details_image';
import YoutubePlayerView from 'views/youtube_player';
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
    // Load image first, to determine dimensions, then load the rest of the content
    if (!this.model.get('image')) {
      this.postRender();
      return this;
    }
    var image_onload_view = new ImageOnloadView({
      src: `/images/products/${this.model.get('image')}`
    });
    image_onload_view.load().then(() => {
      this.postRender();
    }).catch(err => {
      // render anyway?
      console.error(err); 
    });
    return this;
  },
  
  postRender: function() {
    var product = this.model.toJSON();
    // Product makers
    if (_.isArray(product.makers) && product.makers.length) {
      product.makers = product.makers.map(maker_id => {
        return this.refs.makers.findWhere({ _id: maker_id });
      }).join(', ');
    }
    this.$el.html(template.render('partials/product_details', { product: product }));
    // Youtube videos
    var $youtube_player = this.$el.find('.youtube-player');
    $youtube_player.hide();
    if (_.isArray(product.youtube_videos) && product.youtube_videos.length) {
      var yt_view = new YoutubePlayerView({
        collection: product.youtube_videos.map(video_id => {
          return this.refs.youtube_videos.findWhere({ _id: video_id });
        })
      });
      this.$el.find('.youtube-player').replaceWith(yt_view.render().el);
      $youtube_player.show();
      this.$el.find('.sounds-disclaimer').removeClass('hide');
    }
    // Range notation
    if (product.range && product.range.length) {
      import('./range').then(RangeView => {
        var range_view = new RangeView.default({ range: product.range });
        this.$el.find('.range').html(range_view.render().el);
      });
    }
    content_blocks_view.setElement(this.$el).render();
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

