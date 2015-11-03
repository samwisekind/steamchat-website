<audio id="latestAudio">
	<source src="<?php echo $hostLocation . 'episodes/' . $latestEpisode . '/steamchat_episode' . $latestEpisode . '.mp3" type="audio/mp3"' ?>">
</audio>


<div id="latestWrapper">

	<h1>
		<a href="<?php echo $hostLocation . 'episodes/' . $latestEpisode ?>/">#<?php echo $latestEpisode . ": " . $episode["episode"][$latestEpisode][0][0]; ?></a>
	</h1>

	<h2>
		<a href="<?php echo $hostLocation . 'episodes/' . $latestEpisode ?>/">Published <?php echo $episode["episode"][$latestEpisode][0][2]; ?></a>
	</h2>

	<div id="latestTime">
		<span id="latestTime-current">--:--:--</span> / <span id="latestTime-duration">--:--:--</span>
	</div>

	<div id="latestVolume">
		<div id="latestVolume-toggle">
			<a href="#"></a>
		</div>
		<div id="latestVolume-bar">
			<div></div>
		</div>
	</div> 

</div>


<div id="latestToggle" class="playing">
	<a href="#"></a>
</div>

<div id="latestProgress">
	<div class="cover" style="width: 50%;"></div>
</div>