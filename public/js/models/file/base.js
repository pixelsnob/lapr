/**
 * File base model
 * 
 */
import BaseModel from '../base';

export default BaseModel.extend({

  upload_url: null,

  // Allowed mime types
  types: [],

  defaults: {
    last_update: (new Date).getTime()
  },

  initialize: function() {},

  xhr: null,

  upload: function() {
    /*var headers = {
      'X-Csrf-Token': $('meta[name=csrf-param]').attr('content')
    };*/
    var xhr = new XMLHttpRequest;
    var obj = this;
    xhr.upload.onprogress = function(ev) {
      if (ev.lengthComputable) {
        var pct = ev.loaded / ev.total;
        obj.trigger('progress', parseInt(pct * 100));
      }
    };
    xhr.open('POST', this.upload_url, true);
    xhr.onload = function(res) {
      if (this.status == 200) {
        try {
          obj.trigger('upload', JSON.parse(this.response));
        } catch (err) {
          obj.trigger('error', err);
        }
      }
    };
    xhr.onerror = function(err) {
      obj.trigger('error', err);
    };
    var form_data = new FormData;
    form_data.append('file', this.get('file'));
    xhr.send(form_data);
  }
});
