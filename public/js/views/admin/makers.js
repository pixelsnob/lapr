/**
 * makers view
 * 
 */
define([
  'views/base',
  'views/admin/maker',
  'cms/views/modal/base',
  'cms/views/modal/form',
  'template'
], function(
  BaseView,
  MakerView,
  ModalView,
  ModalFormView,
  template
) {

  return BaseView.extend({

    events: {
    },
    
    initialize: function(opts) {
      this.setElement(template.render('admin/makers'));
      this.listenTo(this.collection, 'change', this.render);
    },
    
    render: function() {
      var obj    = this
          $table = this.$el.find('table');
      $table.empty();
      this.collection.each(function(maker) {
        var view = new MakerView({ model: maker });
        $table.append(view.render().el);
      });
      return this;
    },

    renderModal: function(opts) {
      var modal_view = new ModalView;
      modal_view.modal({
        title: 'Edit Makers',
        body: this.render().el,
        save_label: 'Save'
      });
    }
    
  });
});