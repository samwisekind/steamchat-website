<div id="headerLatest">

	<audio id="latestAudio">
		<source src="<?php echo $episode["episode"][$latestEpisode][2][2]; ?>" type="audio/mp3">
	</audio>

	<div id="latestWrapper">

		<h1>
			<a href="<?php echo $hostLocation . 'episodes/' . $latestEpisode ?>/">#<?php echo $latestEpisode . ": " . $episode["episode"][$latestEpisode][0][0]; ?></a>
		</h1>

		<h2>
			<a href="<?php echo $hostLocation . 'episodes/' . $latestEpisode ?>/">Published <span><?php echo $episode["episode"][$latestEpisode][0][2]; ?></span></a>
		</h2>

		<div id="latestTime">
			<span id="latestTime-current">--:--:--</span> / <span id="latestTime-total">--:--:--</span>
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
		<a href="#" onclick="latestToggle(event);"></a>
	</div>

	<div id="latestProgress">
		<div class="cover"></div>
		<div class="line"></div>
	</div>

	<div id="latestLoading">
		<div class="wrapper">
			<div class="circle circle1"></div>
			<div class="circle circle2"></div>
			<div class="circle circle3"></div>
		</div>
	</div>

</div>