@extends('master')

@section('css')

	<link href="{{ $url = asset('css/episode.css') }}" rel="stylesheet" type="text/css">

@endsection

@section('content')

	<main class="content wide episode">

		<section class="columns">

			<section class="large left main">

				<h1>{{ $episode->getTitle(false) }}</h1>
				<h2>{{ date_format(new DateTime($episode->release_date), 'jS F Y') }}</h2>

				<p>{{ $episode->description }}</p>

				@isset($episode->transcript_url)

					<div class="transcript">
						A transcript for this episode is avaliable
						<a href="{{ $episode->transcript_url }}" class="transcript-view" target="_blank" rel="noopener noreferrer">
							<div class="wrapper">View</div>
						</a>
					</div>

				@endisset

				<audio controls preload="none" class="audio js-audio">
					<source src="{{ $episode->file_url }}" type="audio/mp3">
				</audio>

			</section>

			<section class="small right sidebar">

				<ul class="info">
					<li class="title">Episode Info</li>
					<li><span class="subtitle">Duration:</span> {{ $episode->file_duration }}</li>
					<li><span class="subtitle">Size:</span> {{ number_format($episode->file_size / 1048576, 2) }} MB</li>
					<li><span class="subtitle">Format:</span> MP3</li>
				</ul>

				<ul class="tools">
					<li class="title">Episode Tools</li>
					<li><a href="#" class="js-listen">Listen Now</a></li>
					<li><a href="{{ $episode->file_url }}">Direct Link</a></li>
					<li><a href="{{ $episode->file_url }}">Download MP3</a></li>
				</ul>

				<ul class="more">
					<li class="title">More Episodes</li>
					<li class="rss">
						<a href="{{ route('feed-mp3') }}">RSS Feed</a>
					</li>
					<li class="itunes">
						<a href="#" target="_blank" rel="noopener noreferrer">iTunes Store</a>
					</li>
					<li class="google">
						<a href="#" target="_blank" rel="noopener noreferrer">Google Play</a>
					</li>
				</ul>

			</section>

		</section>

		<ul class="navigation">
			@if($episode->getPreviousEpisode() !== null)
				@php $previous = $episode->getPreviousEpisode(); @endphp
				<li class="prev">
					<a href="{{ $previous->getURL() }}">
						<span class="container">
							<span class="small label">Previously:</span>
							<span class="title">{{ $previous->getTitle(true) }}</span>
							<span class="small">{{ date_format(new DateTime($previous->release_date), 'j/m/Y') }}</span>
						</span>
					</a>
				</li>
			@endif
			@if($episode->getNextEpisode() !== null)
				@php $next = $episode->getNextEpisode(); @endphp
				<li class="next">
					<a href="{{ $next->getURL() }}">
						<span class="container">
							<span class="small label">Up next:</span>
							<span class="title">{{ $next->getTitle(true) }}</span>
							<span class="small">{{ date_format(new DateTime($next->release_date), 'j/m/Y') }}</span>
						</span>
					</a>
				</li>
			@endif
		</ul>

	</main>

@endsection
