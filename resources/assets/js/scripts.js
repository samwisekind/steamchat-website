var sidebar = require('./modules/sidebar.js');
var player = require('./modules/player.js');
var listen = require('./modules/listen.js');

(function(){

	// Bind the archive behaviours
	var $sidebar = document.getElementsByClassName('js-archives');
	if ($sidebar.length > 0) {
		sidebar.init($sidebar[0]);
	}

	// Bind the player
	var $player = document.getElementsByClassName('js-player');
	if ($player.length > 0) {
		player.init($player[0]);
	}

	// Bind any listening elements
	var $listen = document.getElementsByClassName('js-listen');
	if ($listen.length > 0) {
		listen.init($listen);
	}

})();
