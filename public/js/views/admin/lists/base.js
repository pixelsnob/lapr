/**
 * Functionality for an admin list, with edit links
 * 
 */
define([
  'views/base',
  'views/admin/modal/base',
  'template',
  'backbone-paginator'
], function(
  BaseView,
  ModalView,
  template
) {
  
  return BaseView.extend({
  
    events: {
      'click .add': 'renderAddForm'
    },
    
    initialize: function() {
      console.log('x');
      this.setElement(template.render('admin/list'));
      this.listenTo(this.collection, 'change add remove', this.render);
      this.$el.find('.pager').hide();
      if (this.paged) {
        this.$el.find('.pager').show();
        this.events['click a.previous'] = 'getPreviousPage';
        this.events['click a.next'] = 'getNextPage';
        this.delegateEvents();
      }
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
    },

    getPreviousPage: function() {
      this.collection.getPreviousPage();
      this.render();
    },

    getNextPage: function() {
      this.collection.getNextPage();
      this.render();
    }
    
  });
});

