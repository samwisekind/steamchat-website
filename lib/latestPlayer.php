<div id="headerplayer" class="int">

	<audio id="playerAudio" preload="none">
		<source src="<?php echo $episode["episode"][$latestEpisode][2][2]; ?>" type="audio/mp3">
	</audio>

	<div id="playerWrapper">

		<div id="playerTitle">
			<h1>
				<a href="<?php echo $hostLocation . 'episodes/' . $latestEpisode ?>/">#<?php echo $latestEpisode . ": " . $episode["episode"][$latestEpisode][0][0]; ?></a>
			</h1>
			<h2>
				<a href="<?php echo $hostLocation . 'episodes/' . $latestEpisode ?>/">Published <span><?php echo $episode["episode"][$latestEpisode][0][2]; ?></span></a>
			</h2>
		</div>

		<div id="playerTime">
			<span id="playerTime-current"></span> / <span id="playerTime-total"></span>
		</div>

		<div id="playerVolume">
			<div id="playerVolume-toggle">
				<a href="#" onclick="playerMute(event);"></a>
			</div>
			<div id="playerVolume-bar">
				<div></div>
			</div>
		</div>

	</div>

	<div id="playerToggle" class="playing">
		<a href="#" onclick="playerToggle(event);"></a>
	</div>

	<div id="playerProgress">
		<div class="cover"></div>
		<div class="line"></div>
	</div>

	<div id="playerLoading">
		<div class="wrapper">
			<div class="circle circle1"></div>
			<div class="circle circle2"></div>
			<div class="circle circle3"></div>
		</div>
	</div>

</div>