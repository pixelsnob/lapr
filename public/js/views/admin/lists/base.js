/**
 * Functionality for an admin list, with edit links
 * 
 */
import BaseView from 'views/base';
import ModalView from 'views/admin/modal/base';
import template from 'template';
import 'backbone.paginator';

export default BaseView.extend({

  events: {
    'click .add': 'renderAddForm'
  },

  initialize: function() {
    this.setElement(template.render('admin/list'));
    this.listenTo(this.collection, 'change add remove destroy', this.render);
  
    this.$el.find('.pager').hide();
    if (this.paged) {
      this.$el.find('.pager').show();
      this.events['click a.previous'] = 'getPreviousPage';
      this.events['click a.next'] = 'getNextPage';
      this.delegateEvents();
    }
  },

  render: function() {
    var $table = this.$el.find('table tbody');
    $table.empty();
    this.collection.each(model => {
      var view = new this.view({
        model: model,
        collection: this.collection
      });
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
      this.close();
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
    if (this.collection.hasPreviousPage()) {
      this.collection.getPreviousPage();
      this.render();
    }
  },

  getNextPage: function() {
    if (this.collection.hasNextPage()) {
      this.collection.getNextPage();
      this.render();
    }
  },

  onClose: function() {
    //this.collection.unbind();
  }

});

