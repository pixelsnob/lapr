/**
 * maker view
 * 
 */
define([
  './base',
  'models/maker',
  'forms/maker'
], function(
  ListItemBaseView,
  MakerModel,
  MakerForm
) {
  
  return ListItemBaseView.extend({
    label: 'maker',
    title: 'Maker',
    model: new MakerModel,
    initialize: function() {
      this.form = new MakerForm({
        model:      this.model,
        collection: this.collection
      });
    }
  });
});

