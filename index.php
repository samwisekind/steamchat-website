<?php
	$pageType = "index";
	$latestEpisode = 102;
	require_once "lib/episodeData.php";
	require_once "lib/header.php";
?>

	<section>

		<table border="0" cellpadding="0" cellspacing="0" class="episodeArchives special">
			<tr class="episodeArchives-header">
				<td>Special Episodes</td>
			</tr>
			<tr>
				<td>
					<ul>
						<?php

							// List of specials/interviews/snacks (in order)
							// [0] = episode index
							// [1] = episode type ("epispde", "snack")
							// [2] = title (some original titles are too long)
							$specialsArray = array(
								array(9, "episode", "2009 Gabe Newell Interview"),
								array(47, "episode", "2011 Gabe Newell Interview, Pt. 1"),
								array(48, "episode", "2011 Gabe Newell Interview, Pt. 2"),
								array(4, "snack", "Black Mesa Interview"),
								array(3, "snack", "Jonathan Coulton Interview"),
								array(2, "snack", "Harry Robins Interview"),
								array(1, "snack", "LambaGeneration Interview"),
								array(16, "episode", "Left 4 Dead 2 Special"),
								array(21, "episode", "Portal 2 Special, Pt. 1"),
								array(22, "episode", "Portal 2 Special, Pt. 2")
							);

							for ($i = 0; $i < count($specialsArray); $i++) {

								$episodeTarget = $episode[$specialsArray[$i][1]][$specialsArray[$i][0]];

								echo '
									<li>
										<a href="' . $hostLocation . $specialsArray[$i][1] . 's/' . $specialsArray[$i][0] . '/' . '" class="link">
											<span class="title">' . $specialsArray[$i][2] . '</span>
											<span class="subtitle"><span class="date">' . $episodeTarget[0][2] . '</span><span class="duration">' . $episodeTarget[2][1] . '</span></span>
										</a>
										<a href="#" class="play" data-audio="' . $episodeTarget[2][2] . '" onclick="playerChange(event, this);"></a>
									</li>';

							};

						?>
					</ul>
				</td>
			</tr>
		</table>

	</section>

	<section>

		<?php

			function listEpisodes($targetStart, $targetEnd) {

				global $hostLocation;
				global $episode;

				for ($i = $targetStart; $i >= $targetEnd; $i--) {

					if ($episode["episode"][$i][1][0] != null || $episode["episode"][$i][1][1] != null) {
						$images = 'data-header="' . $hostLocation . $episode["episode"][$i][1][0] . '" data-background="' . $hostLocation . $episode["episode"][$i][1][1] . '" data-color="' . $episode["episode"][$i][1][2] . '"';
					}
					else {
						$images = null;
					};

					echo '
						<li>
							<a href="' . $hostLocation . 'episodes/' . $i .'/" class="link">
								<span class="title">#' . $i . ': ' . $episode["episode"][$i][0][0] .'</span>
								<span class="subtitle"><span class="date">' . $episode["episode"][$i][0][2] . '</span><span class="duration">' . $episode["episode"][$i][2][1] . '</span></span>
							</a>
							<a href="#" class="play" data-audio="' . $episode["episode"][$i][2][2] . '" onclick="playerChange(event, this);"' . $images . '></a>
						</li>';

				};

			};

		?>

		<table border="0" cellpadding="0" cellspacing="0" class="episodeArchives">
			<tr class="episodeArchives-header">
				<td>2013 Episodes</td>
				<td>2012 Episodes</td>
				<td>2011 Episodes</td>
				<td>2010 Episodes</td>
				<td>2009 Episodes</td>
			</tr>
			<tr>
				<td>
					<ul>
						<?php listEpisodes(103, 100); ?>
					</ul>
				</td>
				<td>
					<ul>
						<?php listEpisodes(99, 77); ?>
					</ul>
				</td>
				<td>
					<ul>
						<?php listEpisodes(76, 44); ?>
					</ul>
				</td>
				<td>
					<ul>
						<?php listEpisodes(43, 17); ?>
					</ul>
				</td>
				<td>
					<ul>
						<?php listEpisodes(16, 1); ?>
					</ul>
				</td>
			</tr>
		</table>

	</section>

<?php include "lib/footer.php"; ?>