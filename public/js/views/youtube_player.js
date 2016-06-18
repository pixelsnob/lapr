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
  'lib/dialog',
  'youtube'
], function(
  BaseView,
  YoutubeVideosView,
  template,
  global_events,
  markdown,
  dialog,
  youtube
) {
  
  return BaseView.extend({
    
    open: false,

    player: null,

    events: {
    },
    
    yt_params: {
      autoplay:        0,
      enablejsapi:     1,
      html5:           1,
      autohide:        1,
      modestbranding:  1,
      showinfo:        0,
      controls:        1,
      disablekb:       0
    },

    initialize: function(opts) {
      this.setElement(template.render('partials/youtube_player', {
        youtube_videos: [] }));
      this.listenTo(global_events, 'yt-play', this.play); 
      this.$player      = this.$el.find('.player');
      this.$description = this.$el.find('.description');
      this.$player.hide();
    },
    
    render: function() {
      var videos_view = new YoutubeVideosView({ collection: this.collection });
      this.$el.find('.youtube-videos').replaceWith(videos_view.render().el);
      return this;
    },
    
    play: function(model) {
      if (this.busy) {
        return;
      }
      // Clear out old iframe, if any
      this.$player.unbind().html($('<iframe frameborder="0" id="ytplayer">'));
      this.model = model;
      this.yt_params.start = model.get('start_time');
      this.yt_params.end   = model.get('end_time');
      var src = '//www.youtube.com/embed/' + model.get('youtube_id') +
                '?' + $.param(this.yt_params);
      this.$player.find('iframe').attr('src', src);
      this.player = new YT.Player('ytplayer', {
        startSeconds: model.get('start_time'),
        events: {
          onReady:         _.bind(this.ready, this),
          onStateChange:   _.bind(this.stateChange, this),
          onError:         _.bind(this.error, this)
        }
      });
      this.$player.fadeIn(2000);
    },
    
    ready: function(ev) {
      ev.target.playVideo();
    },

    stateChange: function(ev) {
      if (ev.data == 0) {
        global_events.trigger('yt-stop');
      }
    },
    
    error: function(ev) {
      this.model.logError('Error playing video');
      global_events.trigger('yt-error', this.model);
      this.$player.hide();
      dialog.alert("There was a problem showing you that video.");
    }

  });
  
});
