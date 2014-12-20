/**
 * Tags tree item view
 * 
 */
define([
  'views/base'
], function(
  BaseView
) {
  
  return BaseView.extend({

    tagName: 'li',

    events: {
    },

    initialize: function(opts) {
       
    },
    
    render: function() {
      this.$el.text(this.model.get('name'));
      return this;
    }

  });
});
