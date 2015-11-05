var $cacheAudio, $cacheProgress, playerWasPaused, playerUpdateInterval, playerUpdateTimeout;
var playerLoaded = playerBinded = playerHover = false;
var playerInt = true;

function formatTime (target) {

	var minutes = Math.round(Math.floor(target / 60));
	var seconds = Math.round(target - minutes * 60);
	var hours = Math.round(Math.floor(target / 3600));
	return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);

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
		$cacheVolume.button = $cacheVolume.find("#playerVolume-toggle a");
		$cacheVolume.bar = $cacheVolume.find("#playerVolume-bar");
		$cacheVolume.dragger = $cacheVolume.bar.find("div");
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
		$cacheProgress.line.css("left", (coordinateX * 100) + "%");
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
		$cacheAudio[0].play();
		playerUpdate();
		playerUpdateInterval = setInterval(playerUpdate, 1000);
		$cachePlayer.addClass("playing");
	}
	else {
		$cacheAudio[0].pause();
		clearInterval(playerUpdateInterval);
		$cachePlayer.removeClass("playing");
	};

};

function playerChange (event, target) {

	event.preventDefault();

	if (playerBinded == false) {
		playerBind();
	};

	target = $(target);
	$cachePlayer.addClass("loading");
	$("html, body").animate({ scrollTop: 0 }, "slow");

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

	if (playerBinded == false) {
		playerBind();
	};

	$cacheAudio[0].volume = 0;
	$cacheVolume.dragger.css("left", 0);
	$cacheVolume.addClass("muted");

};