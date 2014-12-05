/**
 * Functionality for an admin list, with edit links
 * 
 */
define([
  'cms/views/modal/base',
  'template'
], function(
  ModalView,
  template
) {
  return {

    events: {
      'click .add': 'renderAddForm'
    },
    
    initialize: function() {
      this.setElement(template.render('admin/list'));
      this.listenTo(this.collection, 'change add', this.render);
    },

    render: function() {
      var obj    = this
          $table = this.$el.find('table');
      $table.empty();
      this.collection.each(function(category) {
        var view = new obj.view({ model: category });
        $table.append(view.render().el);
      });
      return this;
    },

    renderModal: function(opts) {
      var modal_view = new ModalView;
      modal_view.modal({
        title: 'Edit Product Categories',
        body: this.render().el,
        save_label: 'Close',
        hide_cancel_button: true
      });
      modal_view.listenTo(modal_view, 'save', modal_view.hide);
    },

    renderAddForm: function() {
      var view = new this.view({ model: new this.collection.model });
      view.renderAddForm();
      var obj = this;
      this.listenTo(view, 'add', function(model) {
        obj.collection.add(model);
      });
    }
    
  };
});

