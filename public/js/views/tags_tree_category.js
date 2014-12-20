/**
 * Tags tree category view
 * 
 */
define([
  'views/base',
  'views/tags_tree_list'
], function(
  BaseView,
  TagsTreeListView
) {
  
  return BaseView.extend({

    tagName: 'li',

    events: {
    },

    initialize: function(opts) {
      this.tags = opts.tags;
      this.selected_tags = opts.selected_tags;
    },
    
    render: function() {
      var obj = this;
      this.$el.append(this.model.get('name')); 
      var view = new TagsTreeListView({
        collection: this.tags,
        selected_tags: this.selected_tags
      });
      this.$el.append(view.render().el);
      return this;
    }
  
  });
});
