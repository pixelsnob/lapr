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
    xhr.upload.onprogress = ev => {
      if (ev.lengthComputable) {
        var pct = ev.loaded / ev.total;
        this.trigger('progress', parseInt(pct * 100));
      }
    };
    xhr.open('POST', this.upload_url, true);
    xhr.setRequestHeader('X-Csrf-Token', csrf.getParam());
    xhr.onload = res => {
      if (xhr.status == 200) {
        try {
          this.trigger('upload', JSON.parse(xhr.response));
        } catch (err) {
          this.trigger('error', err);
        }
      }
    };
    xhr.onerror = err => {
      this.trigger('error', err);
    };
    var form_data = new FormData;
    form_data.append('file', this.get('file'));
    xhr.send(form_data);
  }
});
