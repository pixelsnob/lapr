/**
 * Video and audio playlist view
 * 
 */
define([
  './base',
  '../models/playlist_item',
  './player/manager'
], function(
  BaseView,
  PlaylistItemModel,
  PlayerManagerView
) {
  return BaseView.extend({
    el: 'body',
    events: {},

    initialize: function(opts) {
      this.player_manager_view = new PlayerManagerView;
      var obj = this;
      // Don't use players on touch devices
      if (!('ontouchstart' in window.document.documentElement)) {
        _.each(PlaylistItemModel.meta, function(meta) {
          obj.events['click .content-block .content ' + meta.sel] = 'play';
          obj.delegateEvents();
        });
      }
      this.listenTo(this.player_manager_view, 'ended', this.ended);
      this.listenTo(this.player_manager_view, 'stopped', this.stopped);
    },
    
    play: function(ev) {
      ev.preventDefault();
      var el = $(ev.currentTarget);
      if (el.hasClass('playing')) {
        return false;
      }
      var model = new PlaylistItemModel({
        src: el.attr('href')
      });
      this.player_manager_view.play(model, el.text());
      this.reset();
      el.addClass('playing');
      return false;
    },
    
    stopped: function() {
      this.reset();
    },
    
    ended: function() {
      this.reset();
    },

    previous: function() {
      var previous = this.$el.find('a.playing').parent().prev()
        .find('.play');
      if (previous.length) {
        this.playHref(previous);
      } else {
        this.reset();
      }
    },

    next: function() {
      var next = this.$el.find('a.playing').parent().next().find('a');
      if (next.length) {
        next.trigger('click');
      } else {
        this.reset();
      }
    },
    
    stop: function() {
      this.reset();
    },
    
    reset: function(el) {
      this.$el.find('.playing').removeClass('playing');
    }

  });
});
