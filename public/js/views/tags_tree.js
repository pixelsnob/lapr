/**
 * Tags tree master view
 * 
 */
define([
  'views/base',
  'models/tag_category',
  'views/tags_tree_category',
  'lib/events'
], function(
  BaseView,
  TagCategoryModel,
  TagsTreeCategoryView,
  vent
) {
  
  return BaseView.extend({
    
    tagName: 'ul',

    events: {
    },

    initialize: function(opts) {
      this.tag_categories = opts.tag_categories;
      this.tags = opts.tags;
      this.selected_tags = new Backbone.Collection;
      var obj = this;
      /*vent.on('tag-item-selected', function(model) {
        obj.selected_tags.add(model);
        console.log(obj.selected_tags);
      });
      vent.on('tag-item-deselected', function(model) {
        obj.selected_tags.remove(model);
        console.log(obj.selected_tags);
      });*/
    },
    
    render: function() {
      var obj = this;
      this.tag_categories.forEach(function(category) {
        var tags = obj.tags.where({ category: category.id });
        var view = new TagsTreeCategoryView({
          model: category,
          tags: tags,
          selected_tags: obj.selected_tags
        });
        obj.$el.append(view.render().el);
      });
      return this;
    }

  });
  
});
