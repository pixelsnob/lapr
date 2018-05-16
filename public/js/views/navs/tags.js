/**
 * Tags tree master view
 * 
 */
import BaseView from 'views/base';
import TagCategoryModel from 'models/tag_category';
import TagsCategoryView from './tags_category';
import template from 'template';

export default BaseView.extend({

  events: {
    'click .reset': 'reset'
  },

  initialize: function(opts) {
    this.products = opts.products;
    this.listenTo(this.products.refs.tags, 'add change remove', this.render);
    this.setElement(template.render('partials/tags_nav'));
  },

  render: function() {
    //this.$el.append(template.render('partials/tags_nav'));
    var $ul = this.$el.find('ul');
    $ul.empty();
    this.products.refs.tag_categories.forEach(category => {
      var tags = this.products.refs.tags.where({
        category: category.id
      });
      var view = new TagsCategoryView({
        model: category,
        products: this.products,
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
