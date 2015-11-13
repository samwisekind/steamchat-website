function tipToggle (event) {
	event.preventDefault();
	document.getElementsByTagName("body")[0].classList.toggle("headerTip");
};

function episodeToggle (event) {
	event.preventDefault();
	var target = document.getElementById("episodeAudio");
	if (target.paused == true || target.stopped == true) {
		target.play();
	}
	else {
		target.pause();
	};
};