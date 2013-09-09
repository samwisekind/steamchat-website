<?php $frontpage=false; $episodepage=true; $pagetitle=$headertitle="Episode #17: Short and Sweet" ?>
	
	<?php include "../../lib/header.php"; ?>
	
	<div id="wrapper">
		
		<span class="section">

			<h2>Description</h2>

			<p>This is a short episode highlighting what's been going on.</p>

		</span>

		<span class="section">

			<h2>Listen</h2>

			<div id="episode_audio_player">

				<audio id="episode_audio"><source src="http://www.thesteamcast.com/episodes/17/steamcast_episode17.mp3" type="audio/mp3"></audio>

				<div id="episode_audio_toggle"></div>

				<div id="episode_audio_time"><span>00:00:00</span></div>

				<div id="episode_audio_progress_wrapper">

					<div id="episode_audio_progress"></div>

				</div>

			</div>

			<ul style="clear:both;">

				<li><a href="http://www.thesteamcast.com/episodes/17/steamcast_episode17.mp3">Direct MP3 Download</a></li>
				<li><a href="http://www.thesteamcast.com/steamcast_feed.xml">Podcast RSS Feed (M4A)</a></li>
				<li><a href="http://www.thesteamcast.com/steamcast_feed_mp3.xml">Podcast RSS Feed (MP3)</a></li>
				<li><a href="http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewPodcast?id=320594165">iTunes Subscription</a></li>

			</ul>

		</span>
		
	</div>
	
<?php include "../../lib/footer.php"; ?>


























<script language="JavaScript" src="http://www.thesteamcast.com/lib/audio-player.js" type="text/javascript"></script>
<object type="application/x-shockwave-flash" data="http://www.thesteamcast.com/lib/player.swf" id="audioplayer1" height="24" width="290">
<param name="movie" value="player.swf" />
<param name="FlashVars" value="playerID=1&amp;soundFile=http://www.thesteamcast.com/episodes/17/steamcast_episode17.mp3" />
<param name="quality" value="high" />
<param name="menu" value="false" />
<param name="wmode" value="transparent" />
</object>

<ul>
<li>Direct M4A Download (<a href="http://www.thesteamcast.com/episodes/17/steamcast_episode17.m4a">5.1MB</a>)</li>
<li>Direct MP3 Download (<a href="http://www.thesteamcast.com/episodes/17/steamcast_episode17.mp3">3.5MB</a>)</li>
<li><a href="http://www.thesteamcast.com/steamcast_feed.xml">Podcast RSS Feed (M4A)</a></li>
<li><a href="http://www.thesteamcast.com/steamcast_feed_mp3.xml">Podcast RSS Feed (MP3)</a></li>
<li><a href="http://itunes.apple.com/WebObjects/MZStore.woa/wa/viewPodcast?id=320594165">iTunes Subscription</a></li>
</ul>



</div>

<?php include("../../lib/footer.php"); ?>