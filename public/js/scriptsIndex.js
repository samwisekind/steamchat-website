var $archives;

function bindFilters() {

	// Bind checkboxes

	$archives.$checkboxes = $archives.find('.js-checkbox');

	var checkboxesActive = $archives.$checkboxes.length;

	var years = {};

	// Cache the episodes into groups per year

	for (var i = 0; i < $archives.$episodes.length; i++) {

		var targetYear = $archives.$episodes[i].getAttribute('data-year');

		if (years.hasOwnProperty(targetYear) === false) {
			years[targetYear] = $archives.$episodes.filter('[data-year="' + targetYear + '"]');
		}
		else {
			continue;
		}

	}

	$archives.$checkboxes.on('change', function() {

		// If this is the last checkbox checked, prevent it from becoming unchecked

		if (this.checked === false && checkboxesActive <= 1) {

			this.checked = true;

		}
		else {

			var targetYearGroup = years[this.value];

			if (this.checked === true) {
				checkboxesActive++;
				targetYearGroup.removeClass('filter-year');
			}
			else {
				checkboxesActive--;
				targetYearGroup.addClass('filter-year');
			}

		}

	});

	// Bind search

	$archives.$search = $archives.find('.js-search');

	$archives.$search.on('input', function() {

		var value = this.value;
		var regex = new RegExp(value, "i");

		for (i = 0; i < $archives.$episodes.length; i++) {

			var targetElement = $archives.$episodes.eq(i);

			if (targetElement.attr('data-keywords').search(regex) < 0) {
				targetElement.addClass("filter-keyword");
			}
			else {
				targetElement.removeClass("filter-keyword");
			}

		}

	});

	// Bind reset

	$archives.find('.js-reset').on('click', function(event) {

		event.preventDefault();

		$archives.$search.val('').trigger('input');

		for (var i = 0; i < $archives.$checkboxes.length; i++) {
			var targetCheckbox = $archives.$checkboxes.eq(i);
			targetCheckbox[0].checked = true;
			targetCheckbox.trigger('change');
		}

	});

}












$(function() {

	$archives = $('.js-archives');
		$archives.$episodes = $archives.find('.js-episode');

	bindFilters();

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

	var archives = $('.js-archives');
	var sidebar = archives.find('.js-sidebar');

	$(window).scroll(function () {

		if (window.scrollY > (archives.offset().top - 40)) {
			sidebar.addClass('sticky');
		}
		else {
			sidebar.removeClass('sticky');
		}

	}).scroll();

});