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

    events: {
    },

    initialize: function(opts) {
      this.setElement(template.render('partials/youtube_player', {
        youtube_videos: [] }));
      this.listenTo(global_events, 'play-youtube-video', this.play); 
      this.$player = this.$el.find('.player');
    },
    
    render: function() {
      var videos_view = new YoutubeVideosView({ collection: this.collection });
      this.$el.find('.youtube-videos').html(videos_view.render().el);
      this.$player.height(0);
      return this;
    },

    play: function(model) {
      var src = 'http://www.youtube.com/embed/' + model.get('youtube_id') +
                '?enablejsapi=1&html5=1&autohide=1&modestbranding=1&showinfo=0&autoplay=1';
      var $iframe = $('<iframe frameborder="0" id="ytplayer">').attr('src', src); 
      this.$player.html($iframe);
      this.$el.find('.description').html(markdown(model.get('description')));
      new YT.Player('ytplayer', {
        events: {
          'onStateChange': _.bind(this.stateChange, this)
        }
      });
    },

    stateChange: function(ev) {
      var obj = this;
      if (ev.data == 1 && !this.open) {
        this.$player.animate({
          height: this.$el.find('iframe').height() + 20
        }, 400, function() {
          obj.open = true;
        });
      }
    }
  });
  
});
