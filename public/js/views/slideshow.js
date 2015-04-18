/**
 * Simple slideshow functionality: transitions and animations in CSS
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
    
    events: {
    },

    initialize: function(opts) {
    },
    
    render: function() {
      this.setFirst();
      setInterval(this.setNext.bind(this), 5000);
      return this;
    },

    setCurrent: function($el) {
      this.$el.find('.current').removeClass('current');
      $el.addClass('current');
    },
    
    setFirst: function() {
      this.setCurrent(this.$el.find('li:first'));
    },
    
    setNext: function() {
      var next = this.$el.find('.current').next();
      if (next.length) {
        this.setCurrent(next);
      } else {
        this.setFirst();
      }
    }

  });
});

