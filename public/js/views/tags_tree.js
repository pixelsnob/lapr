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
    
    events: {
      'click .reset': 'reset'
    },

    initialize: function(opts) {
      this.products = opts.products;
      var obj = this;
      this.listenTo(this.products.refs.tags, 'add change remove', this.render);
      this.$el.append('<ul>');
      var $reset_link = $('<a>').attr('href', 'javascript:void(0);')
        .text('Reset').addClass('reset');
      var $link_container = $('<div>').addClass('tag').append($reset_link);
      this.$el.append($link_container);
    },
    
    render: function() {
      var obj = this,
          $ul = this.$el.find('ul');
      $ul.empty();
      this.products.refs.tag_categories.forEach(function(category) {
        var tags = obj.products.refs.tags.where({ category: category.id });
        var view = new TagsTreeCategoryView({
          model: category,
          products: obj.products,
          tags: tags
        });
        $ul.append(view.render().el);
      });
      return this;
    },

    reset: function() {
      Backbone.history.navigate('/instruments/tags', true);
      return false;
    }
  });
  
});
