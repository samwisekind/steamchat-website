@extends('master')

@section('css')

	<link href="{{ $url = asset('css/index.css') }}" rel="stylesheet" type="text/css">

@endsection

@section('content')

	<section class="archives js-archives">

		<div class="sidebar js-sidebar">

			<div class="wrapper">

				<h2>Search</h2>
				<input type="search" placeholder="Filter by description..." class="search js-search" />

				<h2>Filter years</h2>
				<ul class="filter years">
					@foreach($years as $year)
						<li>
							<input type="checkbox" id="year-{{ $year["YEAR(release_date)"] }}" value="{{ $year["YEAR(release_date)"] }}" class="input js-year" checked />
							<label for="year-{{ $year["YEAR(release_date)"] }}" class="label">{{ $year["YEAR(release_date)"] }}</label>
						</li>
					@endforeach
				</ul>

				<h2>Filter type</h2>
				<ul class="filter categories">
					<li class="category all">
						<input type="radio" name="category" id="category-all" value="all" class="input js-category" checked />
						<label for="category-all" class="label">All</label>
					</li>
					<li class="category interview">
						<input type="radio" name="category" id="category-interview" value="interview" class="input js-category" />
						<label for="category-interview" class="label"><span class="container">Interview</span></label>
					</li>
					<li class="category game">
						<input type="radio" name="category" id="category-game" value="game-special" class="input js-category" />
						<label for="category-game" class="label"><span class="container">Game Special</span></label>
					</li>
					<li class="category event">
						<input type="radio" name="category" id="category-event" value="event-special" class="input js-category" />
						<label for="category-event" class="label"><span class="container">Event Special</span></label>
					</li>
				</ul>

			</div>

			<a href="#" class="reset js-reset">Reset filters</a>

		</div>

		<div class="list">

			<div class="header">
				<span class="count js-count"></span>
				<span class="empty">No episodes to show (<a href="#" class="js-reset">reset filters?</a>)</span>
			</div>

			@foreach($episodes as $episode)

				<div class="episode js-episode" data-description="{{ $episode->description }}" data-year="{{ date_format(new DateTime($episode->release_date), 'Y') }}" data-category="{{ $episode->category }}">
					<a href="#" class="play js-play" data-id="{{ $episode->id }}"></a>
					<h2><a href="{{ $episode->getURL() }}">{{ $episode->getTitle(false) }}</a></h2>
					<h3><span>{{ date_format(new DateTime($episode->release_date), 'jS F Y') }}</span> – {{ $episode->file_duration }}</h3>
					<p>{{ $episode->description }}</p>
					@isset($episode->category)
						<ul class="categories active">
							@if($episode->category === 'interview')
								<li class="category interview"><span class="container">Interview</span></li>
							@elseif($episode->category === 'game-special')
								<li class="category game"><span class="container">Game Special</span></li>
							@elseif($episode->category === 'event-special')
								<li class="category event"><span class="container">Event Special</span></li>
							@endif
						</ul>
					@endisset
				</div>

			@endforeach

		</div>

	</section>

@endsection
