<?php $frontpage=false; $episodepage=true; $pagetitle=$headertitle="Episode #27: Featuring DJ Bradely-D-Diddles" ?>
	
	<?php include "../../lib/header.php"; ?>
	
	<div id="wrapper">
		
		<span class="section">

			<h2>Description</h2>

			<p>This week DJ Bradely-D-Diddles, DJ Spitfire and DJ Flamov cover the latest news and other topics such as Steam on Mac to the Counter-Strike update.</p>

		</span>

		<span class="section">

			<h2>Listen</h2>

			<div id="episode_audio_player">

				<audio id="episode_audio"><source src="http://www.thesteamcast.com/episodes/27/steamcast_episode27.mp3" type="audio/mp3"></audio>

				<div id="episode_audio_toggle"></div>

				<div id="episode_audio_time"><span>00:00:00</span></div>

				<div id="episode_audio_progress_wrapper">

					<div id="episode_audio_progress"></div>

				</div>

			</div>

			<ul style="clear:both;">

				<li><a href="http://www.thesteamcast.com/episodes/27/steamcast_episode27.mp3">Direct MP3 Download</a></li>
				<li><a href="http://www.thesteamcast.com/steamcast_feed.xml">Podcast RSS Feed (M4A)</a></li>
				<li><a href="http://www.thesteamcast.com/steamcast_feed_mp3.xml">Podcast RSS Feed (MP3)</a></li>
				<li><a href="http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewPodcast?id=320594165">iTunes Subscription</a></li>

			</ul>

		</span>
		
	</div>
	
<?php include "../../lib/footer.php"; ?>