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
      'click .close':    'hide'
    },
    
    initialize: function() {
      
    },
    
    show: function(ev) {
      this.$el.addClass('visible');
      return false;
    },

    hide: function(ev) {
      this.$el.removeClass('visible');
      return false;
    }
    

  });

});

