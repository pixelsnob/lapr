/**
 * image view
 * 
 */
define([
  './base',
  'models/image',
  'forms/image',
  'template'
], function(
  ListItemBaseView,
  ImageModel,
  ImageForm,
  template
) {
  
  return ListItemBaseView.extend({
    
    label: 'image',
    title: 'Image',
    model: new ImageModel,
    
    initialize: function() {
      this.form = new ImageForm({
        model:      this.model,
        collection: this.collection
      });
    },

    render: function() {
      this.$el.append(template.render('admin/image_list_item', this.model.toJSON()));
      return this;
    },
  });
  
});

