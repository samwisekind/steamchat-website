@extends('master')

@section('css')

	<link href="{{ $url = asset('css/styleEpisode.css') }}" rel="stylesheet" type="text/css">

@endsection

@section('content')

	<div class="wrapper">

		<div class="main">

			<h1>{{ $episode->getTitle() }}</h1>
			<h2>{{ date_format(new DateTime($episode->release_date), 'jS F Y') }}</h2>
			<p>{{ $episode->description }}</p>

			<audio controls preload="none" class="player js-player">
				<source src="{{ $episode->file_url }}" type="audio/mp3">
			</audio>

		</div>

		<div class="sidebar">

			<ul>
				<li class="title">Episode Info</li>
				<li><span class="light">Duration:</span> {{ $episode->file_duration }}</li>
				<li><span class="light">Size:</span> {{ number_format($episode->file_size / 1048576, 2) }} MB</li>
				<li><span class="light">Format:</span> MP3</li>
			</ul>

			<ul>
				<li class="title">Episode Tools</li>
				<li><a href="#" class="js-listen">Listen Now</a></li>
				<li><a href="{{ $episode->file_url }}">Direct Link</a></li>
				<li><a href="{{ $episode->file_url }}">Download MP3</a></li>
			</ul>

		</div>

	</div>

	<ul class="navigation">
		@if($episode->getPreviousEpisode() !== null)
			@php $previous = $episode->getPreviousEpisode(); @endphp
			<li class="prev">
				<a href="{{ $previous->getURL() }}">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 70" class="arrow">
						<path d="M0,35,30.9,0,32,1,2,35,32,69l-1.1,1Z" style="fill:#999" />
					</svg>
					<span class="wrapper">
						<span class="small label">Previously:</span>
						<span class="title">{{ $previous->getTitle() }}</span>
						<span class="small">{{ date_format(new DateTime($previous->release_date), 'j/m/Y') }}</span>
					</span>
				</a>
			</li>
		@endif
		@if($episode->getNextEpisode() !== null)
			@php $next = $episode->getNextEpisode(); @endphp
			<li class="next">
				<a href="{{ $next->getURL() }}">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 70" class="arrow">
						<path d="M0,35,30.9,0,32,1,2,35,32,69l-1.1,1Z" style="fill:#999" />
					</svg>
					<span class="wrapper">
						<span class="small label">Up next:</span>
						<span class="title">{{ $next->getTitle() }}</span>
						<span class="small">{{ date_format(new DateTime($next->release_date), 'j/m/Y') }}</span>
					</span>
				</a>
			</li>
		@endif
	</ul>

@endsection
