/**
 * Markdown text utilities
 * 
 * 
 */
define([ 'lib/markdown' ], function(markdown) {
  
  var escape_regex = /([.*+?^=!:${}()|\[\]\/\\])/g;

  return {
    /**
     * Returns the path from a markdown image or link tag at a given start/end
     * location in text. For instance, ![An image](/path/to/image) 
     * 
     * 
     */
    getTagPath: function(opts) {
      var image_regex = /!\[[^\]]*\]\([^\s]*(\s*"[^"]*")?\)/gi,
          link_regex  = /\[[^\]]*\]\([^\s]*(\s*"[^"]*")?\)/gi,
          tag_regex   = (opts.type == 'image' ? image_regex : link_regex);
      var tags = opts.text.match(tag_regex);
      for (var i in tags) { 
        var escaped_tag = tags[i].replace(escape_regex, '\\$1');
        // Find all instances of current image in text
        var r = new RegExp(escaped_tag, 'g');
        while ((m = r.exec(opts.text)) !== null) {
          // See if cursor is in between start and end positions, inclusive
          if (opts.start_pos >= m.index && opts.end_pos <=
              m.index + tags[i].length) {
            // Extract just the path from the markdown image tag
            var match = tags[i].match(/\(([^\s]*)(\s*"[^"]*")?\)/);
            return (typeof match[1] != 'undefined' ? match[1] : null);
          }
        }
      }
    },
    
    /**
     * Inserts a markdown image tag into the text with a given path
     * 
     */
    insertTag: function(opts) {
      // Use image_path as alt text for now
      var tag;
      if (opts.type == 'image') {
        tag = '![](' + opts.path + ') ';
      } else {
        tag = '[](' + opts.path + ') ';
      }
      return opts.text.slice(0, opts.pos) + tag +
             opts.text.slice(opts.pos, opts.text.length);
    }
  };
});


