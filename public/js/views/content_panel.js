/**
 * View for content panel that slides in, as an alternative to a modal
 * 
 */
define([
  'views/base'
], function(
  BaseView
) {
  
  return BaseView.extend({
    
    events: {
      'click .content-panel-close':    'hide'
    },
    
    initialize: function() {
      this.on('shown', _.bind(this.disableDocumentScroll, this));
      var obj = this;
      this.on('hidden', function() {
        obj.$el.find('.content').empty();
      });
      this.shown = false;
    },
    
    show: function(ev) {
      this.trigger('shown');
      var obj = this;
      this.$el.animate({ top: 0 }, function() {
        obj.shown = true;
      });
      return false;
    },
    
    hide: function(silent) {
      this.enableDocumentScroll();
      var obj = this;
      this.trigger('hidden');
      this.$el.animate({ top: '-100%' }, function() {
        obj.shown = false;
      });
      return false;
    },
    
    disableDocumentScroll: function() {
      document.documentElement.style.overflow = 'hidden';  // firefox, chrome
      document.body.scroll = 'no'; // ie only
    },

    enableDocumentScroll: function() {
      document.documentElement.style.overflow = 'visible'; 
      document.body.scroll = 'yes'; 
    },
    
    onHistoryBack: function() {
      this.hide();
    },

    render: function(child_el) {
      this.$el.find('.content').html(child_el);
      return this;
    }

  });

});

