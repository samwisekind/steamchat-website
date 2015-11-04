var $cacheAudio, $cacheProgress, latestHover, latestWasPaused, latestUpdateInterval, latestUpdateTimeout;
var latestLoaded = false;

function formatTime (target) {

	var minutes = Math.round(Math.floor(target / 60));
	var seconds = Math.round(target - minutes * 60);
	var hours = Math.round(Math.floor(target / 3600));
	return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);

};

function latestUpdate () {

	if (latestLoaded == false) {
		return;
	};

	if (latestHover == false) {
		$cacheTimestamp.current.html(formatTime($cacheAudio[0].currentTime));
	};

	var targetWidth = ($cacheAudio[0].currentTime / $cacheAudio[0].duration) * 100;
	$cacheProgress.cover.css("width", targetWidth + "%");

	if ($cacheAudio[0].ended == true) {
		clearInterval(latestUpdateInterval);
	};

};

function latestToggle (event) {

	event.preventDefault();

	if (latestLoaded == false) {
		return;
	};

	if ($cacheAudio[0].paused == true) {
		$cacheAudio[0].play();
		latestUpdate();
		latestUpdateInterval = setInterval(latestUpdate, 1000);
		$cacheLatest.addClass("playing");
	}
	else {
		$cacheAudio[0].pause();
		clearInterval(latestUpdateInterval);
		$cacheLatest.removeClass("playing");
	};

};

function latestChange (event, target) {

	event.preventDefault();
	target = $(target);

	latestWasPaused = $cacheAudio[0].paused;
	latestLoaded = false;
	$cacheLatest.title.html(target.parent().find(".title").html());
	$cacheLatest.date.html(target.parent().find(".date").html());
	$cacheLatest.title.add($cacheLatest.date).attr("href", target.parent().find(".link").attr("href"));
	$cacheProgress.cover.css("width", "0%");
	$cacheProgress.line.css("left", "0%");
	$cacheAudio.find("source").attr("src", target.attr("data-audio"));
	$cacheLatest.addClass("loading");
	$cacheAudio[0].load();

	if (target.attr("data-header") != undefined || target.attr("data-background") != undefined) {
		$cacheLatest.background.removeClass("noBackground");
		var imageLoadBackground = new Image();
		imageLoadBackground.src = target.attr('data-background');
		imageLoadBackground.onload = function() {
			var imageLoadHeader = new Image();
			imageLoadHeader.src = target.attr('data-header');
			imageLoadHeader.onload = function() {
				$cacheLatest.background.css("background-image", "url(" + imageLoadBackground.src + ")");
				$cacheLatest.header.css("background-image", "url(" + imageLoadHeader.src + ")");
			};
		};
	}
	else {
		$cacheLatest.background.addClass("noBackground");
	};

};

$(window).ready(function () {

	$cacheLatest = $("#headerLatest");
		$cacheLatest.title = $cacheLatest.find("h1 a");
		$cacheLatest.date = $cacheLatest.find("h2 a span");
		$cacheLatest.background = $("#header");
		$cacheLatest.header = $cacheLatest.background.find("#headerMenu");
	$cacheAudio = $cacheLatest.find("#latestAudio");
	$cacheProgress = $cacheLatest.find("#latestProgress");
		$cacheProgress.cover = $cacheProgress.find(".cover");
		$cacheProgress.line = $cacheProgress.find(".line");
	$cacheTimestamp = $cacheLatest.find("#latestTime");
		$cacheTimestamp.current = $cacheTimestamp.find("#latestTime-current");
		$cacheTimestamp.total = $cacheTimestamp.find("#latestTime-total");
	$cacheAudio[0].volume = 0.8;

	$cacheProgress.mousemove(function (event) {
		if (latestLoaded == false) {
			return;
		};
		var coordinateY = event.pageX / window.innerWidth;
		$cacheProgress.line.css("left", (coordinateY * 100) + "%");
		$cacheTimestamp.current.html(formatTime($cacheAudio[0].duration * coordinateY));
	}).mouseover(function () {
		latestHover = true;
	}).mouseout(function () {
		latestHover = false;
		latestUpdate();
	}).on("click", function (event) {
		if (latestLoaded == false) {
			return;
		};
		$cacheAudio[0].currentTime = $cacheAudio[0].duration * (event.pageX / window.innerWidth);
		clearTimeout(latestUpdateTimeout);
		$cacheProgress.cover.addClass("smooth");
		latestUpdateTimeout = setTimeout(function() {
			$cacheProgress.cover.removeClass("smooth");
		}, 250);
		latestUpdate();
	});

	$cacheAudio[0].addEventListener("ended", function () {
		clearInterval(latestUpdateInterval);
		$cacheLatest.removeClass("playing");
	});

	$cacheAudio[0].addEventListener("loadedmetadata", function () {
		$cacheTimestamp.current.html("00:00:00");
		$cacheTimestamp.total.html(formatTime($cacheAudio[0].duration));
		$cacheLatest.removeClass("loading");
		latestLoaded = true;
		latestUpdate();
		if (latestWasPaused == false) {
			$cacheAudio[0].play();
		};
	}, false);






	return;













	// Function to add the latest episode menu overlaying image smoothly
	/* var latest_image = new Image();

	latest_image.src = 'episodes/102/episode102_latest_image.jpg';

	latest_image.onload = function() {

		$("#menu_wrapper").addClass("overlay");

	};

	$("#latest_audio_toggle").bind('click', latest_toggle); */


	// Bind for clicking on the audio player to track the audio time
	$('#latest_progress_wrapper').bind('click', function (e) {

		var x = Math.round((e.pageX - this.offsetLeft - (($(window).width() - $("#latest_progress_wrapper").width()) / 2)) / $("#latest_progress_wrapper").width() * $("#latest_audio")[0].duration);

		$("#latest_audio")[0].currentTime = x;

		window.clearInterval(window.latest_update_interval);
		latest_update(true);

		if ($("#latest_audio")[0].paused || $("#latest_audio")[0].ended) { }

		else {

			latest_update_interval = setInterval(latest_update, 1000);

		};

	});

	// Bind for mouse movement around the body to reset the current time
	$('body').bind('mousemove', function (e) {

		if (latest_hover == false) {

		}

		else if (latest_hover == true) {

			$("#latest_audio_time_current").html(timecalc($("#latest_audio")[0].currentTime));
			latest_hover = false;

			$('#latest_progress_line').stop();
			$('#latest_progress_line').animate({ opacity: 0 }, 250, 'easeOutExpo');

		};

	});

	// Bind for mouse movement around the audio player to show hovered timestamp
	$('#latest_progress_wrapper').bind('mousemove', function (e) {

		if (latest_hover == false) {

			latest_hover = true;

		}

		else { };

		var x = Math.round((e.pageX - this.offsetLeft - (($(window).width() - $("#latest_progress_wrapper").width()) / 2)) / $("#latest_progress_wrapper").width() * $("#latest_audio")[0].duration);

		$("#latest_audio_time_current").html(timecalc(x));

		$('#latest_progress_line').stop();
		$('#latest_progress_line').animate({ opacity: 1 }, 250, 'easeOutExpo');

		$("#latest_progress_line").css("left", (e.pageX - this.offsetLeft - (($(window).width() - $("#latest_progress_wrapper").width()) / 2)) + "px");

		e.stopPropagation();

	});

	// Enables the volume bar to be draggable within its parent
	$(function () {

		$("#volume_slider").draggable({ containment: "parent" });

	});

	// Changes audio volume depending on the location of the slider
	$("#volume_slider").bind("drag", function (e) {

		latest_volume = latest_audio.volume;

		latest_audio.volume = parseInt($("#volume_slider").css("left")) / 85;

		if (parseInt($("#volume_slider").css("left")) == 0) {

			$("#volume_button").addClass("volume_muted");

		}

		else {

			$("#volume_button").removeClass("volume_muted");

		};

	});

	// Bind for changing volume by clicking inside the volume bar
	$("#volume_bar").bind('click', function (e) {

		var x = Math.round(e.clientX - $(this).offset().left);

		latest_audio.volume = x / 100;

		$("#volume_slider").stop();
		$('#volume_slider').animate({ left: ((x / 100) * 85) + "px" }, 250, 'easeOutExpo');

	});

	// Bind for volume mute and unmute button
	$("#volume_button").bind('click', function (e) {

		if (latest_audio.volume == 0) {

			latest_audio.volume = latest_volume;

			$("#volume_slider").stop();
			$('#volume_slider').animate({ left: (latest_volume * 85) + "px" }, 250, 'easeOutExpo');

			if (latest_volume == 0) {

				$("#volume_button").addClass("volume_muted");

			}

			else {

				$("#volume_button").removeClass("volume_muted");

			};

		}

		else {

			latest_volume = latest_audio.volume;
			latest_audio.volume = 0;

			$("#volume_slider").stop();
			$('#volume_slider').animate({ left: "0px" }, 250, 'easeOutExpo');

			$("#volume_button").addClass("volume_muted");

		};

	});

});