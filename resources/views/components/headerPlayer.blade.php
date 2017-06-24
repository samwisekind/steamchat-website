<div id="headerplayer" class="int">

	<audio id="playerAudio" preload="none">
		<source src="{{ $latest->episode_url }}" type="audio/mp3">
	</audio>

	<div id="playerWrapper">

		<div id="playerTitle">
			<h1>
				<a href="{{ $latest->getURL() }}">{{ $latest->getTitle(true) }}</a>
			</h1>
			<h2>
				<a href="{{ $latest->getURL() }}">Published <span>{{ date_format(new DateTime($latest->release_date), 'jS F Y') }}</span></a>
			</h2>
		</div>

		<div id="playerTime">
			<span id="playerTime-current">--:--:--</span> / <span id="playerTime-total">--:--:--</span>
		</div>

		<div id="playerVolume">
			<div class="wrapper">
				<a id="playerVolume-toggle" href="#" onclick="playerMute(event)"></a>
				<input id="playerVolume-slider" type="range" value="80" min="0" max="100">
			</div>
		</div>

	</div>

	<a id="playerToggle" class="playing" href="#" onclick="playerToggle(event)"></a>

	<div id="playerProgress">
		<div class="cover"></div>
		<div class="line"></div>
	</div>

	<div id="playerLoading">
		<div class="wrapper">
			<div class="circle circle1"></div>
			<div class="circle circle2"></div>
			<div class="circle circle3"></div>
		</div>
	</div>

</div>