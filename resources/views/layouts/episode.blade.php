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
						<svg xmlns="http://www.w3.org/2000/svg" width="26" height="32" viewBox="0 0 26 32" class="transcript-icon">
							<path d="M25.06,0H4.71A4.71,4.71,0,0,0,0,4.71V27.29A4.71,4.71,0,0,0,4.71,32H25.06a.94.94,0,0,0,.94-.94V.94A.94.94,0,0,0,25.06,0ZM4.71,1.88H24.12V22.59H4.71a4.67,4.67,0,0,0-2.83,1V4.71A2.83,2.83,0,0,1,4.71,1.88Zm0,28.24a2.82,2.82,0,1,1,0-5.65H24.12v5.65Z" style="fill:#FFF" />
						</svg>
						<div class="wrapper transcript-text">A transcript for this episode is avaliable</div>
						<a href="{{ $episode->transcript_url}}" class="transcript-view" target="_blank" rel="noopener noreferrer">
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="17.11" viewBox="0 0 22 17.11" class="view-icon">
								<path d="M21.64,9.42l-7.33,7.33A1.22,1.22,0,0,1,12.58,15l5.25-5.25H1.22a1.22,1.22,0,1,1,0-2.44H17.83L12.58,2.09A1.22,1.22,0,0,1,14.31.36l7.33,7.33a1.23,1.23,0,0,1,0,1.73Z" style="fill:#FFF" />
							</svg>
							<div class="wrapper">View</div>
						</a>
					</div>

				@endisset

				<audio controls preload="none" class="audio js-audio">
					<source src="{{ $episode->file_url }}" type="audio/mp3">
				</audio>

			</section>

			<section class="small right sidebar">

				<ul>
					<li class="title">Episode Info</li>
					<li><span class="subtitle">Duration:</span> {{ $episode->file_duration }}</li>
					<li><span class="subtitle">Size:</span> {{ number_format($episode->file_size / 1048576, 2) }} MB</li>
					<li><span class="subtitle">Format:</span> MP3</li>
				</ul>

				<ul>
					<li class="title">Episode Tools</li>
					<li><a href="#" class="js-listen">Listen Now</a></li>
					<li><a href="{{ $episode->file_url }}">Direct Link</a></li>
					<li><a href="{{ $episode->file_url }}">Download MP3</a></li>
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
