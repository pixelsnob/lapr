/**
 * Basic youtube player
 * 
 */
define([
  'views/base',
  'views/youtube_videos',
  'template',
  'lib/events',
  'lib/markdown',
  'youtube'
], function(
  BaseView,
  YoutubeVideosView,
  template,
  global_events,
  markdown,
  youtube
) {
  
  return BaseView.extend({
    
    open: false,

    player: null,

    events: {
    },
    
    yt_params: {
      autoplay:        1,
      enablejsapi:     1,
      html5:           1,
      autohide:        1,
      modestbranding:  1,
      showinfo:        0
    },

    initialize: function(opts) {
      this.setElement(template.render('partials/youtube_player', {
        youtube_videos: [] }));
      this.listenTo(global_events, 'yt-play', this.play); 
      this.listenTo(global_events, 'yt-show-preview', this.showPreview); 
      this.listenTo(global_events, 'yt-hide-preview', this.hidePreview); 
      this.$player      = this.$el.find('.player');
      this.$description = this.$el.find('.description');
    },
    
    render: function() {
      var videos_view = new YoutubeVideosView({ collection: this.collection });
      this.$el.find('.youtube-videos').replaceWith(videos_view.render().el);
      this.$player.height(0).html($('<iframe frameborder="0" id="ytplayer">'));
      return this;
    },

    play: function(model) {
      this.yt_params.start = model.get('start_time');
      var src = 'http://www.youtube.com/embed/' + model.get('youtube_id') +
                '?' + $.param(this.yt_params);
      this.$player.find('iframe').attr('src', src);
      this.$description.html(markdown(model.get('description')));
      this.$description.removeClass('preview');
      this.open = 1;
      this.player = new YT.Player('ytplayer', {
        events: {
          'onStateChange': _.bind(this.stateChange, this)
          // error <<<<<<<<
        }
      });
    },
    
    showPreview: function(model) {
      if (this.open) {
        return;
      }
      this.$description.html(markdown(model.get('description')));
      this.$description.addClass('preview');
    },

    hidePreview: function(model) {
      if (this.open) {
        return;
      }
      this.$description.empty().removeClass('preview');
    },

    stateChange: function(ev) {
      var obj = this;
      if (ev.data == 1) {
        this.$player.animate({
          height: this.$el.find('iframe').height() + 20
        }, 400);
      }
    }
  });
  
});
