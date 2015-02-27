/**
 * Product details view
 * 
 */
define([
  'views/base',
  'views/modal',
  'views/product_details_image',
  'views/product_range',
  'views/youtube_player',
  'template'
], function(
  BaseView,
  ModalView,
  ProductDetailsImageView,
  RangeView,
  YoutubePlayerView,
  template
) {
  
  return BaseView.extend({
    
    events: {
      'click .image': 'showImageModal'
    },

    initialize: function(opts) {
      this.refs = this.model.collection.refs;
    },
    
    render: function() {
      var product_makers   = this.model.get('makers'),
          product_videos   = this.model.get('youtube_videos'),
          product_range    = this.model.get('range'),
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
      if (product_range.length) {
        var range_view = new RangeView({ range: product_range });
        this.$el.find('.range').html(range_view.render().el);
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
      this.listenTo(modal_view, 'hide', this.close);
    },

    showImageModal: function() {
      var view = new ProductDetailsImageView({ model: this.model });
      view.renderModal();
    }

  });
});

