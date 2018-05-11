/**
 * Product details view
 * 
 */

import Backbone from 'backbone';
import BaseView from 'views/base';
import ProductDetailsImageView from './details_image';
//import RangeView from './range';
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
    var obj = this;
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
    var product      = this.model.toJSON(),
      obj        = this;
    if (_.isArray(product.makers) && product.makers.length) {
      product.makers = product.makers.map(function(maker_id) {
      return obj.refs.makers.findWhere({ _id: maker_id });
      }).join(', ');
    }
    this.$el.html(template.render('partials/product_details', {
      product: product
    }));
    // Image loading stuff
    var $img = this.$el.find('.image');
    if (product.image && product.image.length) {
      var image_onload_view = new ImageOnloadView({
      el:       $img,
      src:      $img.find('img').attr('src')
      });
      image_onload_view.render();
    }
    // Youtube videos
    var $youtube_player = this.$el.find('.youtube-player');
    $youtube_player.hide();
    if (_.isArray(product.youtube_videos) && product.youtube_videos.length) {
      var yt_view = new YoutubePlayerView({
      collection: product.youtube_videos.map(function(video_id) {
        return obj.refs.youtube_videos.findWhere({ _id: video_id });
      })
      });
      this.$el.find('.youtube-player').replaceWith(yt_view.render().el);
      $youtube_player.show();
      this.$el.find('.sounds-disclaimer').removeClass('hide');
    }
    // Range notation, if any
    if (product.range && product.range.length) {
      import('./range').then(RangeView => {
        var range_view = new RangeView.default({ range: product.range });
        this.$el.find('.range').html(range_view.render().el);
      });
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

