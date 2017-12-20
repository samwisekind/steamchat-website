const sidebar = require('./modules/sidebar.js');
const player = require('./modules/player.js');
const listen = require('./modules/listen.js');

(function(){
	// Bind the archive behaviours
	const $sidebar = document.getElementsByClassName('js-archives');
	if ($sidebar.length > 0) {
		sidebar.init($sidebar[0]);
	}

	// Bind the player
	const $player = document.getElementsByClassName('js-player');
	if ($player.length > 0) {
		player.init($player[0]);
	}

	// Bind any listening elements
	const $listen = document.getElementsByClassName('js-listen');
	if ($listen.length > 0) {
		listen.init($listen);
	}

	// Bind hamburger
	const $menu = document.body.getElementsByClassName('js-menu')[0];
	const $hamburger = $menu.getElementsByClassName('js-hamburger');
	$hamburger[0].addEventListener('click', function(event) {
		event.preventDefault();
		$menu.classList.toggle('open');
		document.body.classList.toggle('noscroll');
	});
})();
