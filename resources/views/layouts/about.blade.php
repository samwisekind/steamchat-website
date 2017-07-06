@extends('master')

@section('content')

	<main class="content">

		<h1>About Steamchat</h1>

		<p>Steamchat (formerly "Steamcast") is a podcast that hosts discussions about Valve, Steam, digital distribution, PC games and other related subjects such as the art and design of video games and other topical video game-related subjects.</p>

		<p>Steamchat is an audio-only podcast, with episodes lasting for around an hour in length. New episodes are published on <a href="{{ route('index') }}">our website</a>, on our <a href="{{ route('feed') }}">RSS feed</a>, and on the <a href="http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewPodcast?id=320594165" target="_blank" rel="noopener noreferrer">iTunes Store</a>.</p>

		<h2>History</h2>

		<p>Steamchat was created in early June of 2009, born from the controversy of the Left 4 Dead 2 announcement at E3 of the same year. Since then, it has been maintained by the three hosts; Sam, Saurabh, and Brad. Steamchat has enjoyed considerable success in that time. In August of 2009, Steamchat hosted its <a href="{{ route('episode', ['type' => 'episode', 'number' => 9]) }}">first exclusive interview with Gabe Newell</a>, co-founder and managing director of Valve Software. Staying true to its aim of supporting the community, Steamchat allowed members of the community the opportunity to forward their own questions and concerns to Newell, resulting in an entirely community-produced interview. Since then, Steamchat has published a further six community-based interviews (including <a href="{{ route('episode', ['type' => 'episode', 'number' => 47]) }}">another with Newell</a>, <a href="{{ route('episode', ['type' => 'snack', 'number' => 2]) }}">Harry S. Robins</a>, <a href="{{ route('episode', ['type' => 'snack', 'number' => 5]) }}">Marc Laidlaw</a>, <a href="{{ route('episode', ['type' => 'snack', 'number' => 5]) }}">Al&eacute;sia Glidewell</a>, <a href="{{ route('episode', ['type' => 'snack', 'number' => 5]) }}">Ellen McLain</a>, <a href="{{ route('episode', ['type' => 'snack', 'number' => 3]) }}">Jonathan Coulton</a> and the <a href="{{ route('episode', ['type' => 'snack', 'number' => 4]) }}">Black Mesa mod team</a>).</p>

		<p>You can view a list of <a href="{{ route('specials') }}">our interviews and special episodes here</a>.</p>

		<p>As a community-founded podcast, Steamchat has always placed high importance on community participation, of which members are welcome to join the hosts and share their thoughts and opinions on specific topics. This gave the community - everyday gamers - the opportunity to voice their opinions and concerns.</p>

		<p>Much of the success of Steamchat is owed to the contributions and efforts of its listeners, to which the hosts are endlessly grateful for.</p>

		<h2>Contact</h2>

		<p>We love to hear from our listeners, and have always kept our promise to read and discuss every email and message we get on the show. If you would like for us to discuss something on the show, or just want to get in touch, please feel free to send us an email at <a href="mailto:podcast@thesteamchat.com">podcast@thesteamchat.com</a>.</p>

		<p>The source code for this website is also <a href="https://github.com/Flamov/steamchat-website" target="_blank" rel="noopener noreferrer">avaliable on GitHub</a>.</p>

	</main>

@endsection
