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
      this.products = opts.products;
      var obj = this;
      this.listenTo(this.products.refs.tags, 'add change remove', this.render);// ? 
    },
    
    setSelectedTags: function(tags) {
      console.log('sst');
      var obj = this, models = [], tags = (_.isArray(tags) ? tags : []);
      this.products.refs.selected_tags.reset();
      if (!tags.length) {
        return;
      }
      tags.forEach(function(tag) {
        var model = obj.products.refs.tags.findWhere({ slug: tag });
        if (model) {
          obj.products.refs.selected_tags.add(model);
        }
      });
    },

    render: function() {
      var obj = this;
      this.$el.empty();
      this.products.refs.tag_categories.forEach(function(category) {
        var tags = obj.products.refs.tags.where({ category: category.id });
        var view = new TagsTreeCategoryView({
          model: category,
          products: obj.products,
          tags: tags
        });
        obj.$el.append(view.render().el);
      });
      return this;
    }
  });
  
});
