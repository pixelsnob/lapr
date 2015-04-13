/**
 * Product category "more info" link and modal
 * 
 */
define([
  'views/base',
  'views/modal',
  'models/content_block',
  'views/content_block',
  'lib/markdown'
], function(
  BaseView,
  ModalView,
  ContentBlockModel,
  ContentBlockView,
  markdown
) {
  return BaseView.extend({ 
    
    events: {
      'click a':    'renderModal'
    },
    
    initialize: function(opts) {
      this.products = opts.products;
    },
    
    render: function() {
      var selected_category = this.products.refs.selected_categories.at(0),
          content_block_id  = selected_category.get('more_info_content_block'),
          obj               = this;
      if (selected_category && content_block_id) {
        var model  = new ContentBlockModel,
            view   = new ContentBlockView({ model: model }),
            obj    = this;
        model
          .fetch({ url: model.url() + content_block_id })
          .done(function() {
            obj.$el.html(view.render().el);
          });
      }
      return this; 
    },
    
    renderModal: function() {
      var view = new ModalView;
      view.$el.addClass('product-category-more-info');
      view.render({
        body: this.render().$el
      });
      this.listenTo(view, 'close', _.bind(this.trigger, this, 'close'));
    }
    
  });
});


