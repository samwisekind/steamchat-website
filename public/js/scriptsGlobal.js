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