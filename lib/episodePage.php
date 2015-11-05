<?php

	require_once "common.php";
	require_once "episodeData.php";

	$episodeType = $_GET["type"];
	$episodeNumber = $_GET["number"];

	if (($episodeType !== "episode" || $episodeNumber !== "snack") && !is_numeric($episodeNumber) && !isset($episode[$episodeType][$episodeNumber])) {
		header("Location: " . $hostLocation);
		die();
	};

	$episodePath = $episode[$episodeType][$episodeNumber][2][2];

	if ($_GET["download"] == true) {
		header("Content-Type: audio/mpeg");
		header("Content-Transfer-Encoding: Binary");
		header("Content-disposition: attachment; filename=\"" . basename($episodePath) . "\"");
		readfile($episodePath);
	}
	else {
		$pageType = "episode";
		$pageTitle = $episode[$episodeType][$episodeNumber][0][0];
		require_once "header.php";
	};

?>


<div class="left">

	<h1><?php echo ucfirst($pageType) . " #" . $episodeNumber . ": " . $episode[$episodeType][$episodeNumber][0][0]; ?></h1>

	<h2><?php echo $episode[$episodeType][$episodeNumber][0][2]; ?></h2>

	<p><?php echo $episode[$episodeType][$episodeNumber][0][1]; ?></p>

	<audio controls id="episodeAudio" preload="none">
		<source src="<?php echo $episodePath; ?>" type="audio/mp3">
	</audio>

</div>

<div class="right">

	<ul>
		<li class="title">Episode Info</li>
		<li><span>Duration:</span> <?php echo $episode[$episodeType][$episodeNumber][2][1]; ?></li>
		<li><span>Size:</span> <?php echo number_format($episode[$episodeType][$episodeNumber][2][0] / 1048576, 2); ?>MB</li>
		<li><span>Format:</span> MP3</li>
	</ul>

	<?php

		$episodeShownotes = $episode[$episodeType][$episodeNumber][0][3][0];
		$episodeTranscript = $episode[$episodeType][$episodeNumber][0][3][1];

		if ($episodeShownotes != null || $episodeTranscript != null) {
			echo "<ul><li class='title'>Episode links</li>";
			if ($episodeShownotes != null) {
				echo '<li><a href="' . $episodeShownotes . '">Show Notes</a></li>';
			};
			if ($episodeTranscript != null) {
				echo '<li><a href="' . $episodeTranscript . '">Interview Transcript</a></li>';
			};
			echo "</ul>";
		};

	?>

	<ul id="episodeTools">
		<li class="title">Episode Tools</li>
		<li id="episodeTools-listen"><a href="#" onclick="episodeToggle(event);">Listen Now</a></li>
		<li id="episodeTools-link"><a href="<?php echo $episodePath; ?>">Direct Link</a></li>
		<li id="episodeTools-download"><a href="<?php echo $_SERVER["REQUEST_URI"] . "&download=true"; ?>">Download MP3</a></li>
	</ul>

</div>

<div class="cf"></div>

<ul id="episodeNav">

	<?php if (isset($episode[$episodeType][$episodeNumber - 1][0]) == true) { ?>

		<li class="prev">

			<a href="episodePage.php?type=<?php echo $episodeType; ?>&amp;number=<?php echo $episodeNumber - 1; ?>">

				<span class="title"><?php echo " #" . ($episodeNumber - 1) . ": " . $episode[$episodeType][$episodeNumber - 1][0][0]; ?></span>
				<span class="date"><?php echo $episode[$episodeType][$episodeNumber - 1][0][2]; ?></span>

			</a>

		</li>

	<? }; ?>

	<?php if (isset($episode[$episodeType][$episodeNumber + 1][0]) == true) { ?>

		<li class="next">

			<a href="episodePage.php?type=<?php echo $episodeType; ?>&amp;number=<?php echo $episodeNumber + 1; ?>">

				<span class="title"><?php echo " #" . ($episodeNumber + 1) . ": " . $episode[$episodeType][$episodeNumber + 1][0][0]; ?></span>
				<span class="date"><?php echo $episode[$episodeType][$episodeNumber + 1][0][2]; ?></span>

			</a>

		</li>

	<?php }; ?>

</ul>



<?php require_once "footer.php"; ?>