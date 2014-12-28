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
      this.refs = opts.refs;
      var obj = this;
      this.listenTo(this.refs.tags, 'add change remove', this.render); 
    },
    
    setSelectedTags: function(tags) {
      var obj = this, models = [], tags = (_.isArray(tags) ? tags : []);
      this.refs.selected_tags.reset();
      if (!tags.length) {
        return;
      }
      tags.forEach(function(tag) {
        var model = obj.refs.tags.findWhere({ slug: tag });
        if (model) {
          obj.refs.selected_tags.add(model);
        }
      });
    },

    render: function() {
      var obj = this;
      this.$el.empty();
      this.refs.tag_categories.forEach(function(category) {
        var tags = obj.refs.tags.where({ category: category.id });
        var view = new TagsTreeCategoryView({
          model: category,
          refs: obj.refs,
          tags: tags
        });
        obj.$el.append(view.render().el);
      });
      return this;
    }
  });
  
});
