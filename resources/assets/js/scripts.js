var sidebar = require('./modules/sidebar.js');
// var headerPlayer = require('./modules/header-player.js');
var listen = require('./modules/listen.js');

(function(){

	// Bind the archive behaviours
	var $sidebar = document.getElementsByClassName('js-archives');
	if ($sidebar.length > 0) {
		sidebar.init($sidebar[0]);
	}

	// Bind the headerPlayer
	var $headerPlayer = $('.js-headerPlayer');
	if ($headerPlayer.length > 0) {
		// headerPlayer.init($headerPlayer);
	}

	// Bind any listening elements
	var $listen = $('.js-listen');
	if ($listen.length > 0) {
		listen.init($listen);
	}

})();
