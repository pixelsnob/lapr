/**
 * Audio/video player view
 * 
 */
define([
  '../base',
  './jplayer',
  './youtube',
  'template'
], function(
  BaseView,
  JplayerView,
  YoutubeView,
  template
) {
  return BaseView.extend({
    el: '#players',
    views: {},
    current_player: null,
    initialize: function(opts) {
      this.views = {
        jplayer: new JplayerView,
        youtube: new YoutubeView
      };
      var obj = this;
      _.each(this.views, function(view) {
        obj.listenTo(view, 'stopped', obj.stopped);
        obj.listenTo(view, 'ended', obj.ended);
        obj.listenTo(view, 'error', obj.error);
      });
      // Only jplayer sends a "ready" event
      this.listenTo(this.views.jplayer, 'ready', this.ready);
      this.listenTo(this, 'play', this.hideOthers);
    },
     
    render: function(model) {
      return this.$el;
    },
     
    play: function(model, title) {
      var meta = model.getMeta();
      if (typeof this.views[meta.player] != 'undefined') {
        this.current_view = this.views[meta.player];
        this.current_view.play(model, title);
        this.hideOthers();
      }
    },

    ready: function() {
      this.trigger('ready'); 
    },

    stopped: function() {
      this.trigger('stopped'); 
    },
    
    ended: function() {
      this.trigger('ended'); 
    },
    
    // Hides all players except for the current one
    hideOthers: function() {
      var current_view_cid = (this.current_view ? this.current_view.cid : null);
      _.each(this.views, function(view) {
        if (view.cid != current_view_cid) {
          view.stop();
        }
      });
    },
    
    error: function() {
      this.trigger('error');
    }
  });
});
