<?php $frontpage=false; $episodepage=true; $pagetitle=$headertitle="Episode #6: The Sloppy Show" ?>
	
	<?php include "../../lib/header.php"; ?>
	
	<div id="wrapper">
		
		<span class="section">

			<h2>Description</h2>

			<p>This week, we're all over the place, like a bad Left 4 Dead team.</p>

		</span>

		<span class="section">

			<h2>Listen</h2>

			<div id="episode_audio_player">

				<audio id="episode_audio"><source src="http://www.thesteamchat.com/episodes/6/steamchat_episode6.mp3" type="audio/mp3"></audio>

				<div id="episode_audio_toggle"></div>

				<div id="episode_audio_time"><span>00:00:00</span></div>

				<div id="episode_audio_progress_wrapper">

					<div id="episode_audio_progress"></div>

				</div>

			</div>

			<ul style="clear:both;">

				<li><a href="http://www.thesteamchat.com/episodes/6/steamchat_episode6.mp3">Direct MP3 Download</a></li>
				<li><a href="http://www.thesteamchat.com/steamchat_feed.xml">Podcast RSS Feed (M4A)</a></li>
				<li><a href="http://www.thesteamchat.com/steamchat_feed_mp3.xml">Podcast RSS Feed (MP3)</a></li>
				<li><a href="http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewPodcast?id=320594165">iTunes Subscription</a></li>

			</ul>

		</span>
		
	</div>
	
<?php include "../../lib/footer.php"; ?>