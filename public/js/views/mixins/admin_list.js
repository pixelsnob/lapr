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
      this.collection.each(function(model) {
        var view = new obj.view({ model: model });
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
      modal_view.listenTo(modal_view, 'save', modal_view.hide);
      //this.listenTo(modal_view, 'close', _.bind(this.trigger, this, 'close'));
      this.listenTo(modal_view, 'close', function() {
        this.stopListening(this.collection);
        this.close();
        modal_view.remove();
        this.trigger('close');
      });
    },

    renderAddForm: function() {
      var view = new this.view({ model: new this.collection.model });
      view.renderAddForm();
      this.collection.listenTo(view, 'add', this.collection.add);
    }
    
  };
});

