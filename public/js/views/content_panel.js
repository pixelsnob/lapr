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
      //window.onpopstate = _.bind(this.hide, this);
    },
    
    show: function(ev) {
      console.log('show()');
      //this.disableDocumentScroll();
      this.$el.animate({ top: 0 }, _.bind(this.trigger, this, 'shown'));
      return false;
    },
    
    hide: function(ev) {
      console.log('hide()');
      this.enableDocumentScroll();
      this.$el.animate({ top: '-100%' }, _.bind(this.trigger, this, 'hidden'));
      return false;
    },
    
    disableDocumentScroll: function() {
      document.documentElement.style.overflow = 'hidden';  // firefox, chrome
      console.log('dds');
      document.body.scroll = 'no'; // ie only
    },

    enableDocumentScroll: function() {
      document.documentElement.style.overflow = 'visible'; 
      console.log('eds');
      document.body.scroll = 'yes'; 
    },
    
    render: function(child_el) {
      this.$el.find('.content').html(child_el);
      return this;
    }
    

  });

});

