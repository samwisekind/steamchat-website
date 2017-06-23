var $ = require('jquery');

var $archives;

function bindSidebar() {

	/*** Binding Sidebar ***/

	var sidebar = $archives.find('.js-sidebar');

	$(window).scroll(function() {

		if (window.scrollY > ($archives.offset().top - 40)) {
			sidebar.addClass('sticky');
		}
		else {
			sidebar.removeClass('sticky');
		}

	}).scroll();



	/*** Binding Search ***/

	var searchField = sidebar.find('.js-search');

	searchField.on('input', function() {

		var value = this.value;
		var regex = new RegExp(value, 'gi');

		for (i = 0; i < $archives.$episodes.length; i++) {

			var targetElement = $archives.$episodes.eq(i);

			if (targetElement.attr('data-description').search(regex) < 0) {
				targetElement.addClass('filter-description');
			}
			else {
				targetElement.removeClass('filter-description');
			}

		}

		if (value !== '') {
			searchField.addClass('active');
		}
		else {
			searchField.removeClass('active');
		}

		updateFilteringDisplay();

	});



	/*** Binding Checkboxes ***/

	var checkboxes = {
		elements: sidebar.find('.js-checkbox'),
		years: {}
	};

	checkboxes.total = checkboxes.active = checkboxes.elements.length;

	// Cache the episodes into groups per year by the checkboxes in the sidebar
	for (var i = 0; i < checkboxes.elements.length; i++) {
		var targetYear = checkboxes.elements[i].value;
		checkboxes.years[targetYear] = $archives.$episodes.filter('[data-year="' + targetYear + '"]');
	}

	checkboxes.elements.on('change', function() {

		// If this is the last checkbox checked, prevent it from becoming unchecked
		if (this.checked === false && checkboxes.active <= 1) {

			this.checked = true;

		}
		else {

			this.disabled = false;

			var targetYearGroup = checkboxes.years[this.value];

			if (this.checked === true) {
				checkboxes.active++;
				targetYearGroup.removeClass('filter-year');
				checkboxes.elements.attr('disabled', false);
			}
			else {
				checkboxes.active--;
				targetYearGroup.addClass('filter-year');
			}

			if (checkboxes.active <= 1){

				checkboxes.elements.filter(':checked').attr('disabled', true);

			}

		}

		updateFilteringDisplay();

	});



	/*** Episode Count ***/

	var counter = {
		element: sidebar.find('.js-count'),
		total: $archives.$episodes.length,
		showing: $archives.$episodes.length
	};

	function updateFilteringDisplay () {

		counter.showing = counter.total - $archives.$episodes.filter('.filter-year, .filter-description').length;

		if (counter.showing < counter.total) {
			counter.element.html('Showing ' + counter.showing + ' of ' + counter.total + ' episodes');
			sidebar.addClass('active');
		}
		else {
			sidebar.removeClass('active');
		}

		if (counter.showing === 0) {
			$archives.addClass('empty');
		}
		else {
			$archives.removeClass('empty');
		}

	}



	/*** Binding Reset Button ***/

	$archives.find('.js-reset').on('click', function(event) {

		event.preventDefault();

		searchField.val('').trigger('input');

		for (var i = 0; i < checkboxes.elements.length; i++) {
			var targetCheckbox = checkboxes.elements.eq(i);
			targetCheckbox[0].checked = true;
			targetCheckbox.trigger('change');
		}

		checkboxes.active = checkboxes.total;

		updateFilteringDisplay();

	});

}

$(function() {

	$archives = $('.js-archives');

	if ($archives.length > 0) {

		$archives.$episodes = $archives.find('.js-episode');
		bindSidebar();

	}

	$('.js-listen').on('click', function(event) {

		event.preventDefault();

		var target = document.getElementsByClassName('js-player')[0];

		if (target.paused === true || target.stopped === true) {
			target.play();
		}
		else {
			target.pause();
		}

	});

});






















var $cacheAudio, $cacheProgress, playerWasPaused, playerUpdateInterval, playerUpdateTimeout, playerPreviousVolume, playerTitleOriginal;
var playerLoaded = playerBinded = playerHover = false;
var playerInt = true;

function formatTime (target) {

	target = Number(target);
	var hours = Math.floor(target / 3600);
	var minutes = Math.floor(target % 3600 / 60);
	var seconds = Math.floor(target % 3600 % 60);
	return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds

};

function playerBind () {

	playerBinded = true;

	$cachePlayer = $("#headerplayer");
		$cachePlayer.title = $cachePlayer.find("h1 a");
		$cachePlayer.date = $cachePlayer.find("h2 a");
		$cachePlayer.background = $("#header");
		$cachePlayer.header = $cachePlayer.background.find("#headerMenu");
	$cacheAudio = $cachePlayer.find("#playerAudio");
	$cacheVolume = $cachePlayer.find("#playerVolume");
		$cacheVolume.button = $cacheVolume.find("#playerVolume-toggle");
		$cacheVolume.slider = $cacheVolume.find("#playerVolume-slider");
	$cacheProgress = $cachePlayer.find("#playerProgress");
		$cacheProgress.cover = $cacheProgress.find(".cover");
		$cacheProgress.line = $cacheProgress.find(".line");
	$cacheTimestamp = $cachePlayer.find("#playerTime");
		$cacheTimestamp.current = $cacheTimestamp.find("#playerTime-current");
		$cacheTimestamp.total = $cacheTimestamp.find("#playerTime-total");
	$cacheAudio[0].volume = playerLastVolume = 0.8;

	$cacheProgress.mousemove(function (event) {
		if (playerLoaded == false) {
			return;
		};
		var coordinateX = event.pageX / window.innerWidth;
		$cacheProgress.line.css("left", ((coordinateX * 100) - .25) + "%");
		$cacheTimestamp.current.html(formatTime($cacheAudio[0].duration * coordinateX));
	}).mouseover(function () {
		playerHover = true;
	}).mouseout(function () {
		playerHover = false;
		playerUpdate();
	}).on("click", function (event) {
		if (playerLoaded == false) {
			return;
		};
		$cacheAudio[0].currentTime = $cacheAudio[0].duration * (event.pageX / window.innerWidth);
		clearTimeout(playerUpdateTimeout);
		$cacheProgress.cover.addClass("smooth");
		playerUpdateTimeout = setTimeout(function() {
			$cacheProgress.cover.removeClass("smooth");
		}, 250);
		playerUpdate();
	});

	$cacheAudio[0].addEventListener("ended", function () {
		clearInterval(playerUpdateInterval);
		$cachePlayer.removeClass("playing");
	});

	$cacheAudio[0].addEventListener("loadedmetadata", function () {
		$cacheTimestamp.current.html("00:00:00");
		$cacheTimestamp.total.html(formatTime($cacheAudio[0].duration));
		$cachePlayer.removeClass("loading");
		playerLoaded = true;
		playerUpdate();
		if (playerInt == true) {
			$cachePlayer.removeClass("int");
			playerInt = false;
			playerToggle(event);
		};
		if (playerWasPaused == false) {
			$cacheAudio[0].play();
			playerTitleOriginal = document.title;
			document.title = "Playing: " + $cachePlayer.title.html();
		};
	}, false);

	$cacheVolume.slider.on("input change", function () {
		$cacheAudio[0].volume = parseInt($cacheVolume.slider[0].value) / 100;
		playerPreviousVolume = $cacheAudio[0].volume;
		if ($cacheAudio[0].volume == 0) {
			$cacheVolume.addClass("muted");
		}
		else {
			$cacheVolume.removeClass("muted");
		};
	});

};

function playerUpdate () {

	if (playerLoaded == false) {
		return;
	};

	if (playerHover == false) {
		$cacheTimestamp.current.html(formatTime($cacheAudio[0].currentTime));
	};

	var targetWidth = ($cacheAudio[0].currentTime / $cacheAudio[0].duration) * 100;
	$cacheProgress.cover.css("width", targetWidth + "%");

	if ($cacheAudio[0].ended == true) {
		clearInterval(playerUpdateInterval);
	};

};

function playerToggle (event) {

	event.preventDefault();

	if (playerBinded == false) {
		playerBind();
	};

	if (playerInt == true) {
		$cachePlayer.addClass("loading");
		$cacheAudio[0].load();
		return;
	};

	if ($cacheAudio[0].paused == true) {
		playerTitleOriginal = document.title;
		document.title = "Playing: " + $cachePlayer.title.html();
		$cacheAudio[0].play();
		playerUpdate();
		playerUpdateInterval = setInterval(playerUpdate, 1000);
		$cachePlayer.addClass("playing");
	}
	else {
		document.title = playerTitleOriginal;
		$cacheAudio[0].pause();
		clearInterval(playerUpdateInterval);
		$cachePlayer.removeClass("playing");
	};

};

function playerChange (event, target) {

	event.preventDefault();

	if (playerBinded == false) {
		playerBind();
		playerTitleOriginal = document.title;
	};

	target = $(target);
	$cachePlayer.addClass("loading");
	$("html, body").animate({ scrollTop: 0 }, "slow");

	document.title = playerTitleOriginal;
	playerWasPaused = $cacheAudio[0].paused;
	playerLoaded = false;
	$cachePlayer.title.html(target.parent().find(".title").html());
	$cachePlayer.date.find("span").html(target.parent().find(".date").html());
	$cachePlayer.title.add($cachePlayer.date).attr("href", target.parent().find(".link").attr("href"));
	$cacheProgress.cover.css("width", "0%");
	$cacheProgress.line.css("left", "0%");
	if (playerInt == true) {
		playerInt = false;
		$cachePlayer.removeClass("int");
	};
	$cacheAudio.find("source").attr("src", target.attr("data-audio"));
	$cacheAudio[0].load();
	if (target.attr("data-header") != undefined || target.attr("data-background") != undefined) {
		$cachePlayer.background.removeClass("noBackground");
		var imageLoadBackground = new Image();
		imageLoadBackground.src = target.attr("data-background");
		imageLoadBackground.onload = function() {
			var imageLoadHeader = new Image();
			imageLoadHeader.src = target.attr("data-header");
			imageLoadHeader.onload = function() {
				$cachePlayer.background.css("background-image", "url(" + imageLoadBackground.src + ")").css("background-color", target.attr("data-color"));
				$cachePlayer.header.css("background-image", "url(" + imageLoadHeader.src + ")");
			};
		};
	}
	else {
		$cachePlayer.background.addClass("noBackground");
	};

};

function playerMute (event) {

	event.preventDefault();

	if ($cacheAudio[0].volume > 0) {
		playerPreviousVolume = $cacheVolume.slider[0].value;
		$cacheAudio[0].volume = $cacheVolume.slider[0].value = 0;
		$cacheVolume.addClass("muted");
	}
	else if (playerPreviousVolume > 0) {
		$cacheVolume.slider[0].value = playerPreviousVolume;
		$cacheAudio[0].volume = playerPreviousVolume / 100;
		$cacheVolume.removeClass("muted");
	};

};

$(document).ready(function () {



});