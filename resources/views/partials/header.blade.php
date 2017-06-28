@php

	$meta_title = 'Steamchat';
	$meta_description = 'A Podcast On All Things Valve';

	if (Route::current()->getName() === 'episode') {
		$meta_title = $meta_title . ' ' . $episode->getTitle(false);
		$meta_description = '(Released ' . date_format(new DateTime($episode->release_date), 'j/m/Y') . ') '. $episode->description;
	}
	else {
		$meta_title = $meta_title . ': ' . $meta_description;
	};

@endphp

<!DOCTYPE html>

<html>

	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />
		<title>{{ $meta_title }}</title>
		<link rel="shortcut icon" href="favicon.ico" />
		<link href="{{ asset('css/global.css') }}" rel="stylesheet" type="text/css">
		@yield ('css')
		<link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700" rel="stylesheet" type="text/css">
		<meta property="og:url" content="{{ Request::url() }}" />
		<meta property="og:title" content="{{ $meta_title }}" />
		<meta property="og:description" content="{{ $meta_description }}" />
		<meta name="description" content="{{ $meta_description }}" />
		<meta property="og:image" content="{{ asset('images/global/og_image.png') }}" />
		@if(Route::current()->getName() === 'episode')
			<meta property="og:type" content="music.song" />
			<meta property="music:album" content="Steamchat Podcast" />
			<meta property="music:album:track" content="{{ $episode->number }}" />
			<meta property="music:musician" content="Steamchat Podcast" />
			<meta property="music:duration" content="{{ $episode->getDurationSeconds() }}" />
		@else
			<meta property="og:type" content="website" />
		@endif
	</head>

	<body>

		<header class="global-header">

			<nav class="menu js-menu">

				<div class="logo"><a href="{{ route('index') }}"></a></div>

				<ul class="links">
					<li @if(Route::current()->getName() === 'episode') class="current" @endif><a href="{{ route('index') }}">Episodes</a></li>
					<li @if(Route::current()->getName() === 'specials') class="current" @endif><a href="{{ route('specials') }}">Specials</a></li>
					<li @if(Route::current()->getName() === 'about') class="current" @endif><a href="{{ route('about') }}">About</a></li>
				</ul>

				<ul class="social">
					<li>
						<a href="https://www.facebook.com/SteamchatPodcast" target="_blank" rel="noopener noreferrer">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon">
								<path d="M18.89 0H1.11A1.11 1.11 0 0 0 0 1.11v17.78A1.11 1.11 0 0 0 1.11 20h9.56v-7.75h-2.6v-3h2.59V7a3.65 3.65 0 0 1 3.88-4 21.62 21.62 0 0 1 2.33.12v2.67h-1.6c-1.25 0-1.49.59-1.49 1.47v1.93h3l-.39 3H13.8V20h5.09A1.11 1.11 0 0 0 20 18.89V1.1A1.11 1.11 0 0 0 18.89 0z" fill="#0064BF" class="icon-layer" />
							</svg>
						</a>
					</li>
					<li>
						<a href="https://www.twitter.com/thesteamchat" target="_blank" rel="noopener noreferrer">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="16.26" class="icon">
								<path d="M18 4.05v.53A11.59 11.59 0 0 1 6.28 16.26 11.59 11.59 0 0 1 0 14.41a8.25 8.25 0 0 0 6.07-1.7 4.11 4.11 0 0 1-3.82-2.85 3.94 3.94 0 0 0 .75.08 4.05 4.05 0 0 0 1.1-.15 4.11 4.11 0 0 1-3.29-4 .27.27 0 0 1 0-.05 4 4 0 0 0 1.86.49A4.11 4.11 0 0 1 1.39.76 11.65 11.65 0 0 0 9.85 5a4.11 4.11 0 0 1 7-3.75 8.11 8.11 0 0 0 2.61-1 4.12 4.12 0 0 1-1.81 2.27A8.13 8.13 0 0 0 20 1.93a8.35 8.35 0 0 1-2 2.12z" fill="#0064BF" class="icon-layer" />
							</svg>
						</a>
					</li>
					<li>
						<a href="https://www.steamcommunity.com/groups/SteamchatPodcast" target="_blank" rel="noopener noreferrer">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="icon">
								<path d="M10 0A10 10 0 0 0 0 9.35l5.39 2.21A2.79 2.79 0 0 1 7 11.1l2.48-3.56v-.05a3.8 3.8 0 1 1 3.8 3.81h-.08l-3.51 2.5a2.78 2.78 0 0 1-5.49.68L.41 12.92A10 10 0 1 0 10 0zM6.26 15.33L5 14.81a2.15 2.15 0 1 0 1.16-2.93l1.25.53a1.58 1.58 0 0 1-1.16 2.91zm9.57-7.82A2.53 2.53 0 1 0 13.26 10a2.54 2.54 0 0 0 2.57-2.49zm-4.44 0a1.88 1.88 0 1 1 1.88 1.88 1.88 1.88 0 0 1-1.89-1.88z" fill="#0064BF" class="icon-layer" />
							</svg>
						</a>
					</li>
					<li>
						<a href="https://www.youtube.com/Steamchat" target="_blank" rel="noopener noreferrer">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="14.07" class="icon">
								<path d="M7.93 4l4.74 3.16.66-.35z" fill-rule="evenodd" opacity=".12" class="icon-layer" />
								<path d="M19.8 3a4.33 4.33 0 0 0-.8-2 2.86 2.86 0 0 0-2-.8C14.2 0 10 0 10 0S5.8 0 3 .2A2.86 2.86 0 0 0 1 1a4.33 4.33 0 0 0-.8 2A30.25 30.25 0 0 0 0 6.27v1.52A30.25 30.25 0 0 0 .2 11a4.33 4.33 0 0 0 .8 2 3.39 3.39 0 0 0 2.21.85c1.6.15 6.8.2 6.8.2s4.2 0 7-.21A2.86 2.86 0 0 0 19 13a4.33 4.33 0 0 0 .8-2 30.28 30.28 0 0 0 .2-3.21V6.27A30.28 30.28 0 0 0 19.8 3zM7.94 9.63V4l5.4 2.82z" fill="#0064BF" class="icon-layer" />
							</svg>
						</a>
					</li>
				</ul>

			</nav>

			@if(Route::current()->getName() === 'index')
				<div class="js-player"></div>
			@endif

		</header>

		<main class="content">
