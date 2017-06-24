<!DOCTYPE html>

<html>

	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />
		<title>Steamchat</title>
		<link rel="shortcut icon" href="favicon.ico" />
		<link href="{{ $url = asset('css/styleGlobal.css') }}" rel="stylesheet" type="text/css">
		@yield ('css')
		<link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700" rel="stylesheet" type="text/css">
		<meta property="og:url" content="TBA" />
		<meta property="og:title" content="TBA" />
		<meta property="og:description" content="TBA" />
		<meta name="description" content="TBA" />
		<meta property="og:image" content="TBA" />
		@if(1 === 1)
			<meta property="og:type" content="music.song" />
			<meta property="music:album" content="Steamchat Podcast" />
			<meta property="music:album:track" content="TBA" />
			<meta property="music:musician" content="Steamchat Podcast" />
			<meta property="music:duration" content="TBA" />
		@else
			<meta property="og:type" content="website" />
		@endif
	</head>

	<body>

		<header id="header" @isset($latest) style="background-image: url('{{ $latest->header_background_image }}'); background-color: {{ $latest->header_mask_colour }}" @endisset>

			<nav id="headerMenu" @isset($latest) style="background-image: url('{{ $latest->header_mask_image }}');" @endisset>

				<div id="headerLogo"><a href="{{ route('home') }}"></a></div>

				<ul class="menu">
					<li><a href="{{ route('home') }}">Episodes</a></li>
				</ul>

				<ul class="social">
					<li class="facebook">
						<a href="https://www.facebook.com/SteamchatPodcast" target="_blank" rel="noopener noreferrer">
							<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" class="icon-element">
								<path d="M28.34,0H1.66A1.66,1.66,0,0,0,0,1.66V28.34A1.66,1.66,0,0,0,1.66,30H16V18.38H12.11V13.85H16V10.51c0-3.87,2.37-6,5.82-6a32.43,32.43,0,0,1,3.49.18v4h-2.4c-1.88,0-2.24.89-2.24,2.2v2.89h4.48l-.59,4.53H20.7V30h7.64A1.66,1.66,0,0,0,30,28.34V1.65A1.66,1.66,0,0,0,28.34,0Z" fill="#8CC8FE" class="layer"></path>
							</svg>
						</a>
					</li>
					<li class="twitter">
						<a href="https://www.twitter.com/thesteamchat" target="_blank" rel="noopener noreferrer">
							<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" class="icon-element">
								<path d="M26.93,8.88c0,.26,0,.53,0,.8,0,8.13-6.19,17.51-17.51,17.51A17.38,17.38,0,0,1,0,24.42a12.37,12.37,0,0,0,9.11-2.55A6.16,6.16,0,0,1,3.37,17.6a5.91,5.91,0,0,0,1.16.11,6.08,6.08,0,0,0,1.62-.22,6.16,6.16,0,0,1-4.94-6,.4.4,0,0,1,0-.08A6.07,6.07,0,0,0,4,12.15,6.16,6.16,0,0,1,2.09,3.94a17.48,17.48,0,0,0,12.68,6.43A6.16,6.16,0,0,1,25.26,4.75a12.17,12.17,0,0,0,3.91-1.49,6.18,6.18,0,0,1-2.71,3.41A12.2,12.2,0,0,0,30,5.7a12.52,12.52,0,0,1-3.07,3.18Zm0,0" fill="#8CC8FE" class="layer"></path>
							</svg>
						</a>
					</li>
					<li class="steam">
						<a href="https://www.steamcommunity.com/groups/SteamchatPodcast" target="_blank" rel="noopener noreferrer">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="icon-element">
								<path d="M16,0A16,16,0,0,0,0,14.94H0l8.61,3.54a4.46,4.46,0,0,1,2.63-.73l3.92-5.69s0-.05,0-0.08a6.08,6.08,0,1,1,6.08,6.09H21.1l-5.61,4a4.44,4.44,0,0,1-8.77,1.08l-6.06-2.5A16,16,0,1,0,16,0Z" fill="#8CC8FE" class="layer" />
								<path d="M10,24.5l-2-.82A3.43,3.43,0,1,0,9.85,19l2,0.85A2.52,2.52,0,0,1,10,24.5Z" fill="#8CC8FE" class="layer" />
								<path d="M25.3,12A4.05,4.05,0,1,0,21.24,16,4.06,4.06,0,0,0,25.3,12ZM18.2,12a3,3,0,1,1,3,3A3,3,0,0,1,18.2,12Z" fill="#8CC8FE" class="layer" />
							</svg>
						</a>
					</li>
					<li class="youtube">
						<a href="https://www.youtube.com/Steamchat" target="_blank" rel="noopener noreferrer">
							<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" class="icon-element">
								<path d="M22.72,20.55a.56.56,0,0,0-.49.2,1.08,1.08,0,0,0-.15.65v.73h1.25v-.73a1.07,1.07,0,0,0-.15-.65A.53.53,0,0,0,22.72,20.55Z" fill="#8CC8FE" class="layer"></path>
								<path d="M26,14.94c-1.16-1.16-11-1.18-11-1.18s-9.79,0-11,1.18-1.17,6.9-1.17,6.94,0,5.77,1.17,6.94S15,30,15,30s9.79,0,11-1.18,1.18-6.94,1.18-6.94S27.12,16.1,26,14.94ZM10.09,18.32H8.44v8.34H6.85V18.32H5.2V16.91h4.89Zm4.66,8.34H13.34v-.79a3,3,0,0,1-.82.67,1.69,1.69,0,0,1-.82.23.87.87,0,0,1-.74-.32,1.58,1.58,0,0,1-.25-1v-6h1.41V25a.63.63,0,0,0,.09.37.35.35,0,0,0,.29.11.79.79,0,0,0,.4-.15,2,2,0,0,0,.44-.39V19.46h1.41Zm5.14-1.49a1.81,1.81,0,0,1-.33,1.17,1.17,1.17,0,0,1-1,.41,1.67,1.67,0,0,1-.74-.16,1.82,1.82,0,0,1-.6-.49v.55H15.82V16.91h1.43V20a2.18,2.18,0,0,1,.61-.5,1.38,1.38,0,0,1,.65-.17,1.22,1.22,0,0,1,1,.46,2.17,2.17,0,0,1,.36,1.35Zm4.91-1.94H22.09v1.35a1.61,1.61,0,0,0,.14.79.53.53,0,0,0,.48.22.58.58,0,0,0,.49-.19,1.55,1.55,0,0,0,.14-.82v-.33H24.8v.37a2.34,2.34,0,0,1-.53,1.67,2.09,2.09,0,0,1-1.59.56,1.93,1.93,0,0,1-1.5-.59,2.32,2.32,0,0,1-.55-1.63V21.4a2.05,2.05,0,0,1,.6-1.53,2.11,2.11,0,0,1,1.55-.59,2,2,0,0,1,1.49.55,2.18,2.18,0,0,1,.52,1.57Z" fill="#8CC8FE" class="layer"></path>
								<path d="M17.84,20.52a.67.67,0,0,0-.3.07,1,1,0,0,0-.29.22v4.48a1.22,1.22,0,0,0,.34.25.79.79,0,0,0,.34.08.45.45,0,0,0,.38-.15.79.79,0,0,0,.12-.5V21.26a.88.88,0,0,0-.15-.55A.54.54,0,0,0,17.84,20.52Z" fill="#8CC8FE" class="layer"></path>
								<path d="M21.12,8.84a2.09,2.09,0,0,1-.49.43.91.91,0,0,1-.44.17.39.39,0,0,1-.32-.13.66.66,0,0,1-.1-.41V2.82H18.17V9.44a1.69,1.69,0,0,0,.28,1.06,1,1,0,0,0,.83.35,2,2,0,0,0,.92-.25,3.33,3.33,0,0,0,.92-.74v.88h1.59V2.82H21.12Z" fill="#8CC8FE" class="layer"></path>
								<path d="M16.25,3.19a2.32,2.32,0,0,0-1.62-.58,2.58,2.58,0,0,0-1.73.55,1.82,1.82,0,0,0-.64,1.47V8.74a2.13,2.13,0,0,0,.63,1.61,2.34,2.34,0,0,0,1.67.6,2.41,2.41,0,0,0,1.71-.58,2.08,2.08,0,0,0,.62-1.6V4.68A1.92,1.92,0,0,0,16.25,3.19Zm-1,5.7a.66.66,0,0,1-.19.5.72.72,0,0,1-.51.18.64.64,0,0,1-.49-.18.71.71,0,0,1-.17-.5V4.57a.54.54,0,0,1,.18-.42A.69.69,0,0,1,14.55,4a.78.78,0,0,1,.51.16.52.52,0,0,1,.2.42Z" fill="#8CC8FE" class="layer"></path>
								<polygon points="9.19 4.29 9.08 4.29 7.92 0 6.11 0 8.24 6.49 8.24 10.75 10.04 10.75 10.04 6.29 12.13 0 10.3 0 9.19 4.29" fill="#8CC8FE" class="layer"></polygon>
							</svg>
						</a>
					</li>
				</ul>

			</nav>

			@isset($latest)
				@include('components.headerPlayer', [
					'episode' => $latest
				])
			@endisset

		</header>

		<main class="content">
