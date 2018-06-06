/**
 * content_block view
 * 
 */
import BaseView from 'views/base';
import ContentBlockModel from 'models/content_block';
import ContentBlockView from 'views/content_block';
//import ContentBlockAdminView from 'views/admin/content_block';
import markdown from 'lib/markdown';
import template from 'template';

export default BaseView.extend({
  
  events: {
  },
  
  initialize: function(opts) {
    // Content block editor if logged in
    if (!window.__lapr_ssr && window.lapr.user) {
      import('views/admin/content_block').then(ContentBlockAdminView => {
        var events = {
          'click .edit-content-block':   _.bind(this.edit, this, ContentBlockAdminView.default),
          'click .save-content-block':   'save',
          'click .revert-content-block': 'revert'
        };
        this.delegateEvents(_.extend(this.events, events));
      });
    }
    this.listenTo(this.model, 'change', this.render);
  },
  
  render: function() {
    var content = this.model.get('content');
    if (this.model.get('type') == 'markdown') {
      content = markdown(content);
    }
    this.$el.html(template.render('partials/content_block'));
    var $content = this.$el.find('.content');
    $content.html(content);
    return this;
  },

  edit: function(ContentBlockAdminView) {
    var view = new ContentBlockAdminView({ model: this.model });
    view.renderModal();
    this.listenTo(view, 'save', function() {
      if (this.model.hasChanged()) {
      	this.showEditLinks();
      }
    });
  },

  save: function() {
    this.model.save(this.model.attributes).then(() => {
      this.hideEditLinks();
    }).catch(this.showServerError);
  },

  revert: function() {
    this.deferred = this.model.fetch().then(() => {
      this.hideEditLinks();
      this.render();
    }).catch(this.showServerError);
  },

  showEditLinks: function() {
    this.$el.find('.edit-links .save, .edit-links .revert')
      .removeClass('hide');
  },

  hideEditLinks: function() {
    this.$el.find('.edit-links .save, .edit-links .revert')
      .addClass('hide');
  }

});

