<?php header('Content-Type: text/xml'); ?>

<?xml version="1.0" encoding="UTF-8"?>

<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" version="2.0">

	<channel>
		<title>Steamchat</title>
		<link>https://www.thesteamchat.com</link>
		<language>en-us</language>
		<copyright>&#xA9; Steamchat</copyright>
		<itunes:subtitle>Steamchat is a podcast on all things Valve</itunes:subtitle>
		<itunes:author>Sam, Saurabh, Brad</itunes:author>
		<itunes:summary>Steamchat is a podcast all about Valve, their games, services and community discussions from the Steam Users' Forums. Every week the three hosts - Sam, Saurabh and Brad - discuss Valve-related news and highlight topics brought up by the community. Episodes last for an hour in length and are released every Wednesday.</itunes:summary>
		<description>Sam, Saurabh and Brad talk about Valve, their games and the community discussions in the Steam Users' Forums.</description>
		<itunes:owner>
			<itunes:name>Samuel Kindler</itunes:name>
			<itunes:email>sam@flamov.com</itunes:email>
		</itunes:owner>
		<itunes:image href="http://www.thesteamchat.com/itunesartv2.jpg" />
		<itunes:category text="Games &amp; Hobbies">
			<itunes:category text="Video Games" />
		</itunes:category>
		<itunes:category text="Technology">
			<itunes:category text="Tech News" />
		</itunes:category>

		@foreach ($episodes as $episode)

			<item>
				<title>Steamchat {{ $episode->getTitle(false) }}</title>
				<itunes:author>Steamchat</itunes:author>
				<itunes:subtitle>{{ $episode->description }}</itunes:subtitle>
				<itunes:summary>{{ $episode->description }}</itunes:summary>
				<enclosure url="{{ $episode->file_url }}" length="{{ $episode->file_size }}" type="audio/mpeg" />
				<guid>{{ $episode->file_url }}</guid>
				<pubDate>{{ date_format(new \DateTime($episode->release_date), 'D, j M o') }} 00:00:00 GMT</pubDate>
				<itunes:duration>{{ $episode->duration }}</itunes:duration>
				<itunes:keywords>Steam, Steampowered, Steam Powered, Valve, Video Games, Computer Games, Half-Life 2, Half-Life 2 Episode 1, Half-Life 2: Episode 2, Half-Life 2: Episode 3, Team Fortress 2, Left 4 Dead, Left 4 Dead 2</itunes:keywords>
			</item>

		@endforeach

	</channel>

</rss>