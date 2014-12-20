/**
 * Tags tree master view
 * 
 */
define([
  'views/base',
  'views/tags_tree_list_item'
], function(
  BaseView,
  TagsTreeListItemView
) {
  
  return BaseView.extend({

    tagName: 'ul',

    events: {
    },

    initialize: function(opts) {
    },
    
    render: function() {
      var obj = this;
      this.collection.forEach(function(tag) {
        var view = new TagsTreeListItemView({ model: tag });
        obj.$el.append(view.render().el);
      });
      return this;
    }


  });
  
});
