
document.addEventListener('DOMContentLoaded', async ev => {

  if (!('content' in document.createElement('template'))) {
    var $script = document.createElement('script');
    $script.src = '/dist/webcomponentsjs/template/template.js';
    document.body.appendChild($script);

  }
});
