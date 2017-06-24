<div class="player js-player int">

	<audio class="js-audio" preload="none">
		<source src="{{ $latest->episode_url }}" type="audio/mp3">
	</audio>

	<div class="container">

		<div class="title">
			<h1>
				<a href="{{ $latest->getURL() }}">{{ $latest->getTitle(true) }}</a>
			</h1>
			<h2>
				<a href="{{ $latest->getURL() }}">Published <span>{{ date_format(new DateTime($latest->release_date), 'jS F Y') }}</span></a>
			</h2>
		</div>

		<div class="time">
			<span class="time-current">--:--:--</span> / <span class="time-total">--:--:--</span>
		</div>

		<div class="volume">
			<div class="wrapper">
				<a class="volume-toggle" href="#"></a>
				<input class="volume-slider" type="range" value="80" min="0" max="100">
			</div>
		</div>

	</div>

	<a class="toggle playing js-play" href="#"></a>

	<div class="progress">
		<div class="progress-cover"></div>
		<div class="progress-line"></div>
	</div>

	<div class="loading">
		<div class="wrapper">
			<div class="circle circle1"></div>
			<div class="circle circle2"></div>
			<div class="circle circle3"></div>
		</div>
	</div>

</div>