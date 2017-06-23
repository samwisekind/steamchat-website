@extends('master')

@section('content')

	<section class="archives js-archives">

		<div class="sidebar js-sidebar">

			<div class="wrapper">

				<h2>Search</h2>
				<input type="search" placeholder="Filter by keywords..." class="search js-search" />

				<h2>Filter years</h2>
				<ul class="filter year">
					@foreach($years as $year)
						<li>
							<input type="checkbox" id="year-{{ $year["YEAR(release_date)"] }}" value="{{ $year["YEAR(release_date)"] }}" class="input js-checkbox" checked />
							<label for="year-{{ $year["YEAR(release_date)"] }}" class="label">{{ $year["YEAR(release_date)"] }}</label>
						</li>
					@endforeach
				</ul>

				<h2>Filter type</h2>
				<ul class="filter types">
					<li><input type="radio" name="type" id="type-all" value="type-all" class="input js-radio" checked /><label for="type-all" class="label">All</label></li>
					<li><input type="radio" name="type" id="type-interview" value="type-interview" class="input js-radio" /><label for="type-interview" class="label"><span data-type="interview" class="type interview">Interview</span></label></li>
		   			<li><input type="radio" name="type" id="type-game" value="type-game" class="input js-radio" /><label for="type-game" class="label"><span data-type="game" class="type game">Game Special</span></label></li>
		   			<li><input type="radio" name="type" id="type-event" value="type-event" class="input js-radio" /><label for="type-event" class="label"><span data-type="event" class="type event">Event Special</span></label></li>
				</ul>

			</div>

			<span class="count js-count"></span>
			<a href="#" class="reset js-reset">Reset filters</a>

		</div>

		<div class="list">

			@foreach($episodes as $episode)

				<div class="episode js-episode" data-year="{{ date_format(new DateTime($episode->release_date), 'Y') }}" data-description="{{ $episode->description }}">
					<a href="#" class="play" data-audio="" onclick="playerChange(event, this);" data-header="" data-background="" data-color=""></a>
					<h2><a href="#">{{ $episode->title }}</a></h2>
					<h3><span>{{ date_format(new DateTime($episode->release_date), 'jS F Y') }}</span> – {{ $episode->file_duration }}</h3>
					<p>{{ $episode->description }}</p>
					<ul class="types">
						@isset($episode->category)
							@if($episode->category === 'inteview')
								<li><span class="type interview">Interview</span></li>
							@elseif($episode->category === 'game-special')
								<li><span class="type game">Game Special</span></li>
							@elseif($episode->category === 'event-special')
								<li><span class="type event">Event Special</span></li>
							@endif
						@endisset
					</ul>
				</div>

			@endforeach

			<div class="no-results">No episodes to show (<a href="#" class="js-reset">reset filters?</a>)</div>

		</div>

	</section>

@endsection
