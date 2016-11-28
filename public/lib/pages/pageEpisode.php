<?php

	require_once "../common.php";
	require_once "../episodeData.php";

	$episodeType = $_GET["type"];
	$episodeNumber = $_GET["number"];

	if (($episodeType !== "episode" && $episodeType !== "snack") || !is_numeric($episodeNumber) || !isset($episode[$episodeType][$episodeNumber])) {
		header("Location: " . $hostLocation);
		die();
	};

	$episodePath = $episode[$episodeType][$episodeNumber][2][2];
	$episodeName = basename($episodePath, ".mp3");

	if (isset($_GET["download"]) == 1) {
		header("Content-Type: audio/mpeg");
		header("Content-Transfer-Encoding: Binary");
		header("Content-disposition: attachment; filename=\"" . $episodeName . ".mp3\"");
		readfile($episodePath);
		exit;
	};

	$pageType = "episode";
	$episodeTitle = $episode[$episodeType][$episodeNumber][0][0];
	require_once "../header.php";

?>



<div class="left">

	<h1><?php echo ucfirst($pageType) . " #" . $episodeNumber . ": " . $episodeTitle; ?></h1>

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
		<li><span>Size:</span> <?php echo number_format($episode[$episodeType][$episodeNumber][2][0] / 1048576, 2); ?> MB</li>
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
		<li><a href="#" onclick="episodeToggle(event)">Listen Now</a></li>
		<li><a href="<?php echo $episodePath; ?>">Direct Link</a></li>
		<li><a href="<?php echo $_SERVER["REQUEST_URI"] . "download/"; ?>">Download MP3</a></li>
	</ul>

</div>

<div class="cf"></div>

<ul id="episodeNav">

	<?php if (isset($episode[$episodeType][$episodeNumber - 1][0]) == true) { ?>

		<li class="prev">

			<a href="<?php echo $hostLocation . $episodeType . "s/" . ($episodeNumber - 1); ?>/">

				<span class="title"><?php echo " #" . ($episodeNumber - 1) . ": " . $episode[$episodeType][$episodeNumber - 1][0][0]; ?></span>
				<span class="date"><?php echo $episode[$episodeType][$episodeNumber - 1][0][2]; ?></span>

			</a>

		</li>

	<? }; ?>

	<?php if (isset($episode[$episodeType][$episodeNumber + 1][0]) == true && ($episodeNumber + 1) > $latestEpisode == false) { ?>

		<li class="next">

			<a href="<?php echo $hostLocation . $episodeType . "s/" . ($episodeNumber + 1); ?>/">

				<span class="title"><?php echo " #" . ($episodeNumber + 1) . ": " . $episode[$episodeType][$episodeNumber + 1][0][0]; ?></span>
				<span class="date"><?php echo $episode[$episodeType][$episodeNumber + 1][0][2]; ?></span>

			</a>

		</li>

	<?php }; ?>

</ul>



<?php require_once "../footer.php"; ?>