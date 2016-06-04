/**
 * View for content panel that slides in, as an alternative to a modal
 * 
 */
define([
  'views/base',
  'template'
], function(
  BaseView,
  template
) {
  
  return BaseView.extend({
    
    enable_keydowns: true,

    events: {
      'click .content-panel-close a':  'hide',
      'click': 'hideIfOverlay'
    },
    
    initialize: function() {
      this.setElement(template.render('partials/content_panel'));
    },
    
    render: function($content) {
      this.$el.find('.content').html($content);
      return this;
    },
    
    setNav: function($nav) {
      this.clearNav();
      this.$el.find('.nav-container').prepend($nav);
    },

    clearNav: function($nav) {
      this.$el.find('.nav-links').remove();
    },

    hide: function(ev) {
      $(window).off('keydown', _.bind(this.onKeydown, this));
      this.trigger('hidden');
      return false;
    },

    hideIfOverlay: function(ev) {
      if ($(ev.target).attr('id') == 'content-panel') {
        this.hide();
      }
    },
    
    onKeydown: function(ev) {
      if (this.enable_keydowns && ev.keyCode == 27) {
        this.hide();
      }
    },

    disableKeydowns: function() {
      this.enable_keydowns = false;
    },

    enableKeydowns: function() {
      this.enable_keydowns = true;
    },
    
    onClose: function() {
    }
    
  });

});

