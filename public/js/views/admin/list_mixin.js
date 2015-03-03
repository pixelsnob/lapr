/**
 * Functionality for an admin list, with edit links
 * 
 */
define([
  'views/admin/modal/base',
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
      this.listenTo(this.collection, 'change add remove', this.render);
    },

    render: function() {
      var obj    = this
          $table = this.$el.find('table');
      $table.empty();
      this.collection.each(function(model) {
        var view = new obj.view({ model: model, collection: obj.collection });
        $table.append(view.render().el);
      });
      return this;
    },

    renderModal: function(opts) {
      var modal_view = new ModalView;
      modal_view.modal({
        title: this.title,
        body: this.render().el,
        save_label: 'Close',
        hide_cancel_button: true
      });
      modal_view.$el.addClass('admin-modal');
      modal_view.listenTo(modal_view, 'save', modal_view.hide);
      this.listenTo(modal_view, 'close', function() {
        this.trigger('close');
      });
    },

    renderAddForm: function() {
      var view = new this.view({
        model: new this.collection.model,
        collection: this.collection
      });
      view.renderAddForm();
      this.collection.listenTo(view, 'add', this.collection.add);
    }
    
  };
});
