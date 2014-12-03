/**
 * product_category view
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
    
    tagName: 'tr',

    events: {
    },
    
    initialize: function() {
    },

    render: function() {
      this.$el.append(template.render('admin/category', this.model.toJSON())); 
      return this;
    }

  });
});
