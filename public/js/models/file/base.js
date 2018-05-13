/**
 * File base model
 * 
 */
import BaseModel from '../base';
import csrf from 'lib/csrf';

export default BaseModel.extend({

  upload_url: null,

  // Allowed mime types
  types: [],

  defaults: {
    last_update: (new Date).getTime()
  },

  initialize: function() {},

  upload: function() {
    var xhr = new XMLHttpRequest;
    var obj = this;
    xhr.upload.onprogress = function(ev) {
      if (ev.lengthComputable) {
        var pct = ev.loaded / ev.total;
        obj.trigger('progress', parseInt(pct * 100));
      }
    };
    xhr.open('POST', this.upload_url, true);
    xhr.setRequestHeader('X-Csrf-Token', csrf.getParam());
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
