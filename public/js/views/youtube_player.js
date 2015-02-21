/**
 * Basic youtube player
 * 
 */
define([
  'views/base',
  'views/youtube_videos',
  'template',
  'lib/events'
], function(
  BaseView,
  YoutubeVideosView,
  template,
  global_events
) {
  
  return BaseView.extend({
    
    events: {
    },

    initialize: function(opts) {
      this.setElement(template.render('partials/youtube_player', { youtube_videos: [] }));
      this.listenTo(global_events, 'play-youtube-video', this.play); 
    },
    
    render: function() {
      //this.$el.append('sex');
      var videos_view = new YoutubeVideosView({ collection: this.collection });
      this.$el.find('.youtube-videos').html(videos_view.render().el);
      return this;
    },

    play: function(model) {
      console.log(model);
      var src = 'http://www.youtube.com/embed/' + model.get('youtube_id') +
                '?autohide=1&modestbranding=1&showinfo=0&autoplay=1';
      var $iframe = $('<iframe frameborder="0" id="ytplayer">').attr('src', src); 
      this.$el.find('.player').html($iframe);
      //this.$iframe_container.html($iframe);
      //this.$caption.text(this.caption);
    }
  });
  
});
