/**
 * Index page view
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
      this.setElement(template.render('partials/index'));
    },
    
    render: function() {
      return this;
    }

  });
});

