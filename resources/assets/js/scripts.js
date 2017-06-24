window.$ = window.jQuery = require('jquery');
var sidebar = require('./modules/sidebar.js');
var headerPlayer = require('./modules/headerPlayer.js');
var listen = require('./modules/listen.js');

(function(){

	// Bind the archive behaviours
	var $archives = $('.js-archives');
	if ($archives.length > 0) {
		sidebar.init($archives);
	}

	// Bind any listening elements
	var $listen = $('.js-listen');
	if ($listen.length > 0) {
		listen.init($listen);
	}

})();
