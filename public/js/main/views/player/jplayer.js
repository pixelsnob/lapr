/**
 * Jplayer player implementation
 * 
 */
define([
  '../base',
  '../../models/player_settings',
  'jplayer',
  'template',
  'jquery-ui/ui/slider'
], function(BaseView, PlayerSettingsModel, jplayer, template) {
  return BaseView.extend({
    el: '#players',
    events: {
      'click #jplayer .jp-stop': 'stop',
      'click #jplayer .player-ui .volume-up': 'volumeUp',
      'click #jplayer .player-ui .volume-off': 'volumeOff'
    },
    
    player_settings: new PlayerSettingsModel,
    
    initialize: function(opts) {
      this.$el.append(template.render('player/jplayer'));
      var $container   = this.$player_container = this.$el.find('#jplayer');
      this.$player     = this.$el.find('#jplayer .player');
      this.$seek_bar   = $container.find('.custom-seek-bar');
      this.$volume_bar = $container.find('.custom-volume-bar');
      var obj          = this;
      // Configure player
      this.$player.jPlayer({
        supplied:            'mp3',
        swfPath:             '/bower_components/jplayer/jquery.jplayer/' + 
                             'Jplayer.swf',
        cssSelectorAncestor: '.player-ui',
        errorAlerts:         false,
        ended:               _.bind(this.ended, this),
        wmode:               'window',
        error:               _.bind(this.error, this),
        ready:               _.bind(this.ready, this),
        timeupdate:          _.bind(this.timeUpdate, this),
        volumechange:        _.bind(this.volumeChange, this)
      });
      // Configure volume and progress sliders
      var volume = this.player_settings.get('volume');
      this.$volume_bar.slider({
        min: 0,
        max: 100,
        value: volume,
        range: 'min',
        animate: false,
        slide: function(ev, ui) {
          obj.setVolume(ui.value);
        }
      });
      this.setVolume(volume);
      this.$seek_bar.slider({
        min: 0,
        max: 99, // Not 100 so "ended" event won't get triggered when slider is
                 // moved to the end
        value: 0,
        range: 'min',
        animate: false,
        slide: function(ev, ui) {
          var sp = obj.$player.data().jPlayer.status.seekPercent;
          obj.$player.jPlayer('playHead', ui.value * (100 / sp));
        }
      });
    },
    
    timeUpdate: function(ev) {
      var percent = Math.floor(ev.jPlayer.status.currentPercentAbsolute);
      this.$player_container.find('.custom-seek-bar').slider('value', percent);
    },

    volumeChange: function(ev) {
      var volume = Math.ceil(ev.jPlayer.options.volume * 100);
      this.player_settings.set('volume', volume);
      this.player_settings.save();
      this.$player_container.find('.custom-volume-bar').slider('value', volume);
    },

    ready: function() {
      this.trigger('ready');
    },

    render: function() {
      return this.$el;
    },
    
    play: function(model, title) {
      var obj = this;
      this.$player_container.find('.jp-title').text('');
      this.show(function() {
        var opts = {},
            meta = model.getMeta();
        opts[meta.jplayer_type] = model.get('src');
        opts.title = title;
        obj.$player.jPlayer('setMedia', opts);
        obj.$player.jPlayer('play');
        obj.trigger('play');
      });
    },

    stop: function() {
      if (this.$player.data().jPlayer.status.src) {
        this.$player.jPlayer('stop');
        this.trigger('stopped');
        this.$player.jPlayer('clearMedia');
        this.hide();
      }
    },

    setVolume: function(volume) {
      this.$player.jPlayer('volume', volume / 100);
    },

    volumeUp: function() {
      this.setVolume(100);
    },

    volumeOff: function() {
      this.setVolume(0);
    },
    
    show: function(cb) {
      cb = (typeof cb == 'function' ? cb : function() {});
      var h = this.$player_container.height();
      if (h) {
        // Skip the rest if already open
        return cb();
      }
      // Set height to auto temporarily to see how tall it will be when open
      this.$player_container.height('auto');
      h = this.$player_container.height();
      this.$player_container.height(0);
      this.$player_container.animate({ height: h }, 300, 'linear', cb);
    },

    hide: function() {
      var obj = this;
      obj.$player_container.animate({ height: 0 }, 200, 'linear');
    },

    ended: function() {
      this.trigger('ended');
      this.hide();
    },

    error: function(ev) {
      var headers = {
        'X-Csrf-Token': $('meta[name=csrf-param]').attr('content')
      };
      $.ajax({
        url: '/log/jplayer',
        type: 'post',
        data: ev.jPlayer.error,
        headers: headers
      });
      this.trigger('error');
    }
  });
});
