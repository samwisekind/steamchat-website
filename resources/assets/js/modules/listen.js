function listenBehaviour(event) {
	event.preventDefault();

	const target = document.getElementsByClassName('js-audio')[0];
	if (target.paused === true || target.stopped === true) {
		target.play();
	}
	else {
		target.pause();
	}
}

export function init(elements) {
	for (let i = 0; i < elements.length; i++) {
		elements[i].addEventListener('click', listenBehaviour);
	}
}
