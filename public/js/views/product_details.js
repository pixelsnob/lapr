/**
 * Product details view
 * 
 */
define([
  'views/base',
  'views/modal',
  'views/product_details_image',
  'views/product_details_more_info',
  'views/product_range',
  'views/youtube_player',
  'views/image_onload',
  'template'
], function(
  BaseView,
  ModalView,
  ProductDetailsImageView,
  ProductDetailsMoreInfoView,
  RangeView,
  YoutubePlayerView,
  ImageOnloadView,
  template
) {
  
  return BaseView.extend({
    
    events: {
      'click .image':      'showImageModal',
      'click .more-info':  'showMoreInfoModal'
    },

    initialize: function(opts) {
      this.refs = this.model.collection.refs;
    },
    
    render: function() {
      var product_makers   = this.model.get('makers'),
          product_videos   = this.model.get('youtube_videos'),
          product_range    = this.model.get('range'),
          product_image    = this.model.get('image'),
          product          = this.model.toJSON(),
          obj              = this,
          makers_list      = '';
      if (_.isArray(product_makers)) {
        makers_list = product_makers.map(function(maker_id) {
          return obj.refs.makers.findWhere({ _id: maker_id });
        }).join(', ');
      }
      this.$el.html(template.render('partials/product_details', {
        product: product,
        makers:  makers_list
      }));
      // Youtube videos
      var $youtube_player = this.$el.find('.youtube-player');
      $youtube_player.hide();
      if (product_videos.length) {
        var yt_view = new YoutubePlayerView({
          collection: product_videos.map(function(video_id) {
            return obj.refs.youtube_videos.findWhere({ _id: video_id });
          })
        });
        this.$el.find('.youtube-player').html(yt_view.render().el);
        $youtube_player.show();
      }
      // Range notation, if any
      if (product_range.length) {
        var range_view = new RangeView({ range: product_range });
        this.$el.find('.range').html(range_view.render().el);
      }
      // Image loading stuff
      if (product_image) {
        var image_onload_view = new ImageOnloadView({
          el:    this.$el.find('.image'),
          src:   '/images/' + product_image 
        });
      }
      if (product.more_info) {
        this.$el.find('.more-info').show();
      }
      return this;
    },
    
    renderModal: function(opts) {
      this.render();
      var modal_view = new ModalView;
      modal_view.$el.addClass('product-details');
      modal_view.render({
        body: this.$el
      });
      var obj = this;
      this.listenTo(modal_view, 'close', _.bind(this.trigger, this, 'close'));
    },

    showImageModal: function() {
      var view = new ProductDetailsImageView({ model: this.model });
      view.renderModal();
    },

    showMoreInfoModal: function() {
      var view = new ProductDetailsMoreInfoView({ model: this.model });
      view.renderModal();
    },

    close: function() {
      BaseView.prototype.close.apply(this, arguments);      
      this.trigger('modal-close');
    }

  });
});

