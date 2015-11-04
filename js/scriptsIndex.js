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

	$("html, body").animate({ scrollTop: 0 }, "slow");

	latestWasPaused = $cacheAudio[0].paused;
	latestLoaded = false;
	$cacheLatest.title.html(target.parent().find(".title").html());
	$cacheLatest.date.find("span").html(target.parent().find(".date").html());
	$cacheLatest.title.add($cacheLatest.date).attr("href", target.parent().find(".link").attr("href"));
	$cacheProgress.cover.css("width", "0%");
	$cacheProgress.line.css("left", "0%");
	$cacheAudio.find("source").attr("src", target.attr("data-audio"));
	$cacheLatest.addClass("loading");
	$cacheAudio[0].load();

	if (target.attr("data-header") != undefined || target.attr("data-background") != undefined) {
		$cacheLatest.background.removeClass("noBackground");
		var imageLoadBackground = new Image();
		imageLoadBackground.src = target.attr("data-background");
		imageLoadBackground.onload = function() {
			var imageLoadHeader = new Image();
			imageLoadHeader.src = target.attr("data-header");
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

function latestMute (event) {

	event.preventDefault();

	$cacheAudio[0].volume = 0;
	$cacheVolume.dragger.css("left", 0);
	$cacheVolume.addClass("muted");

};

$(window).ready(function () {

	$cacheLatest = $("#headerLatest");
		$cacheLatest.title = $cacheLatest.find("h1 a");
		$cacheLatest.date = $cacheLatest.find("h2 a");
		$cacheLatest.background = $("#header");
		$cacheLatest.header = $cacheLatest.background.find("#headerMenu");
	$cacheAudio = $cacheLatest.find("#latestAudio");
	$cacheVolume = $cacheLatest.find("#latestVolume");
		$cacheVolume.button = $cacheVolume.find("#latestVolume-toggle a");
		$cacheVolume.bar = $cacheVolume.find("#latestVolume-bar");
		$cacheVolume.dragger = $cacheVolume.bar.find("div");
	$cacheProgress = $cacheLatest.find("#latestProgress");
		$cacheProgress.cover = $cacheProgress.find(".cover");
		$cacheProgress.line = $cacheProgress.find(".line");
	$cacheTimestamp = $cacheLatest.find("#latestTime");
		$cacheTimestamp.current = $cacheTimestamp.find("#latestTime-current");
		$cacheTimestamp.total = $cacheTimestamp.find("#latestTime-total");
	$cacheAudio[0].volume = latestLastVolume = 0.8;

	$cacheProgress.mousemove(function (event) {
		if (latestLoaded == false) {
			return;
		};
		var coordinateX = event.pageX / window.innerWidth;
		$cacheProgress.line.css("left", (coordinateX * 100) + "%");
		$cacheTimestamp.current.html(formatTime($cacheAudio[0].duration * coordinateX));
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

	$cacheVolume.bar.on("click", function (event) {

		var coordinateX = Math.round(event.clientX - $(this).offset().left - 10);

		if (coordinateX < 0) {
			coordinateX = 0;
		}
		else if (coordinateX > 90) {
			coordinateX = 90;
		};

		$cacheVolume.dragger.css("left", coordinateX);
		$cacheVolume.dragger.trigger("drag");

	});

	$cacheVolume.dragger.draggable({
		containment: "parent"
	}).bind("drag", function () {

		$cacheAudio[0].volume = $cacheVolume.dragger.position().left / 90;

		if ($cacheAudio[0].volume == 0) {
			$cacheVolume.addClass("muted");
		}
		else {
			$cacheVolume.removeClass("muted");
		};

	});

});