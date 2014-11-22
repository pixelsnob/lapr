/**
 * Youtube player implementation
 * 
 */
define([
  '../base',
  'youtube',
  'template'
], function(BaseView, YT, template) {
  return BaseView.extend({
    el: 'body',
    events: {
      'click #youtube a.close': 'close'
    },

    initialize: function(opts) {
      this.$el.find('#players').append(template.render('player/youtube'));
      this.$overlay = this.$el.find('#overlay');
      this.$player = this.$el.find('#youtube .player');
      this.$player_container = this.$el.find('.youtube-inner');
    },
    
    play: function(model) {
      this.show();
      var qs = '?enablejsapi=1&autoplay=1&html5=1&autohide=1';
      var iframe = $('<iframe>').attr({
        id: 'youtube-iframe',
        src: 'https:' + model.get('src') + qs, 
        frameborder: 0
      });
      this.$player.empty().append(iframe);
      this.player = new YT.Player('youtube-iframe', {
        events: {
          'onStateChange': _.bind(this.change, this)
        }
      });
    },
    
    change: function(ev) {
      if (!ev.data) {
        this.stop();
        this.hide();
      }
    },
    
    stop: function() {
      if (this.player) {
        this.player.stopVideo();
      }
      this.trigger('stopped');
    },

    show: function() {
      var obj = this;
      this.$overlay.fadeIn(50, function() {
        obj.$player_container.height('auto');
      });
    },

    hide: function() {
      var obj = this;
      obj.$player_container.height(0);
      this.$overlay.fadeOut(200, function() {
        obj.trigger('hidden');
      });
    },

    close: function() {
      this.stop();
      this.hide();
    }
    
  });
});
