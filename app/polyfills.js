
// App-level polyfills

document.addEventListener('DOMContentLoaded', async ev => {

  if (!('content' in document.createElement('template'))) {
    var $script = document.createElement('script');
    $script.src = '/dist/webcomponentsjs/template/template.js';
    document.body.appendChild($script);
  }

	/*if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || 
																Element.prototype.webkitMatchesSelector;

	if (!Element.prototype.closest) {
		Element.prototype.closest = function(s) {
			var $el = this;
			if (!document.documentElement.contains($el)) return null;
			do {
				if ($el.matches(s)) return $el;
				$el = $el.parentElement || $el.parentNode;
			} while ($el !== null && $el.nodeType === 1); 
			return null;
    };*/
});
