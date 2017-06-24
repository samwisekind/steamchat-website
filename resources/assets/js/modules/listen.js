function listenBehaviour(event) {

	event.preventDefault();

	var target = document.getElementsByClassName('js-player')[0];

	if (target.paused === true || target.stopped === true) {
		target.play();
	}
	else {
		target.pause();
	}

}

export function init(elements) {
	elements.on('click', listenBehaviour);
}