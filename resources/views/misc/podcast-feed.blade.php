<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" version="2.0">

	<channel>
		<title>Steamchat Podcast</title>
		<link>https://www.thesteamchat.com</link>
		<language>en-us</language>
		<copyright>&#xA9; Steamchat</copyright>
		<itunes:subtitle>Steamchat is a podcast on all things Valve</itunes:subtitle>
		<itunes:author>Sam, Saurabh, Brad</itunes:author>
		<itunes:summary>Steamchat is a podcast that hosts discussions about Valve, Steam, digital distribution, PC games and other related subjects such as the art and design of video games and other topical video game-related subjects.</itunes:summary>
		<description>Steamchat is a podcast that hosts discussions about Valve, Steam, digital distribution, PC games and other related subjects such as the art and design of video games and other topical video game-related subjects.</description>
		<itunes:owner>
			<itunes:name>Samuel Kindler</itunes:name>
			<itunes:email>sam@flamov.com</itunes:email>
		</itunes:owner>
		<itunes:image href="{{ asset('images/seo/podcast-feed-logo.png')}}" />
		<itunes:category text="Games &amp; Hobbies">
			<itunes:category text="Video Games" />
		</itunes:category>
		<itunes:category text="Technology">
			<itunes:category text="Tech News" />
		</itunes:category>
		<itunes:type>episodic</itunes:type>

		@foreach ($episodes as $episode)

			<item>
				<title>Steamchat {{ $episode->getTitle(false) }}</title>
				<itunes:author>Steamchat</itunes:author>
				<itunes:subtitle>{{ $episode->description }}</itunes:subtitle>
				<itunes:summary>{{ $episode->description }}</itunes:summary>
				<enclosure url="{{ $episode->file_url }}" length="{{ $episode->file_size }}" type="audio/mpeg" />
				<guid>{{ $episode->file_url }}</guid>
				<pubDate>{{ date_format(new \DateTime($episode->release_date), 'D, j M o') }} 00:00:00 GMT</pubDate>
				<itunes:duration>{{ $episode->file_duration }}</itunes:duration>
				<itunes:keywords>Steam, Steampowered, Steam Powered, Valve, Video Games, Computer Games, Half-Life 2, Half-Life 2 Episode 1, Half-Life 2: Episode 2, Half-Life 2: Episode 3, Team Fortress 2, Left 4 Dead, Left 4 Dead 2</itunes:keywords>
				<itunes:explicit>no</itunes:explicit>
				<itunes:episode>{{ $episode->number }}</itunes:episode>
				@if($episode->type === 'episode')
					<itunes:title>{{ $episode->title }}</itunes:title>
					<itunes:episodeType>full</itunes:episodeType>
				@elseif($episode->type === 'snack')
					<itunes:title>{{ $episode->getTitle(false) }}</itunes:title>
					<itunes:episodeType>bonus</itunes:episodeType>
				@endif
			</item>

		@endforeach

	</channel>

</rss>