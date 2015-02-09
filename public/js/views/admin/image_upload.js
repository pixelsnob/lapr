/**
 * Image upload view
 * 
 */
define([
  'views/base',
  'views/modal',
  'template'
], function(
  BaseView,
  ModalView,
  template
) {
  return BaseView.extend({
    
    initialize: function() {

    },

    render: function() {
      this.$el.html(template.render('admin/image_upload'));
      return this;
    },

    renderModal: function() {
      this.render();
      var modal_view = new ModalView;
      modal_view.$el.addClass('admin-modal');
      modal_view.render({
        body: this.$el
      });
      this.listenTo(modal_view, 'hide', this.close);
    }
  });
});

