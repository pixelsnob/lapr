/**
 * Tags tree master view
 * 
 */
define([
  'views/base',
  'models/tag_category',
  'views/tags_tree_category'
], function(
  BaseView,
  TagCategoryModel,
  TagsTreeCategoryView
) {
  
  return BaseView.extend({
    
    tagName: 'ul',

    events: {
    },

    initialize: function(opts) {
      this.tag_categories = opts.tag_categories;
      this.tags = opts.tags;
    },
    
    render: function() {
      var obj = this;
      this.tag_categories.forEach(function(category) {
        var tags = obj.tags.where({ category: category.id });
        var view = new TagsTreeCategoryView({
          model: category,
          tags: tags
        });
        obj.$el.append(view.render().el);
      });
      return this;
    }

  });
  
});
