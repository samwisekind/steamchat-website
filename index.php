<?php
	$pageType = "index";
	$latestEpisode = 102;
	require_once "lib/episodeData.php";
	require_once "lib/header.php";
?>
	
	<div id="wrapper">

		<table border="0" cellpadding="0" cellspacing="0" class="episodeArchives special">

			<tr class="episodeArchives-header">

				<td>Special Episodes</td>

			</tr>

			<tr>

				<td>

					<ul>

						<?php

							foreach ($episode as $key => $value) {

								$type = "$key";

								foreach ($episode[$key] as $key => $value) {

									if ($episode[$type][$key][0][4] !== "interview" && $episode[$type][$key][0][4] !== "special") {
										continue;
									};

							?>

								<li>
									<a href="<?php echo $hostLocation; ?>episodes/<?php echo $key; ?>/">
										<span class="title"><?php echo $episode[$type][$key][0][0]; ?></span>
										<span class="date"><?php echo $episode[$type][$key][0][2]; ?></span>
									</a>
								</li>

						<?php

								};

							};

						?>

					</ul>
				
				</td>

			</tr>

		</table>

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
						<?php

							foreach ($episode as $key => $value) {

								$type = $key;

								foreach ($episode[$key] as $key => $value) {

									if ($type != "episode" || strpos($episode[$type][$key][0][2], "2013") == false) {
										continue;
									};

							?>

								<li>
									<a href="<?php echo $hostLocation; ?>episodes/<?php echo $key; ?>/">
										<span class="title">#<?php echo $key . ": " . $episode[$type][$key][0][0]; ?></span>
										<span class="date"><?php echo $episode[$type][$key][0][2]; ?></span>
									</a>
								</li>

						<?php

								};

							};

						?>
					</ul>

				</td>

				<td>

					<ul>
						<?php

							foreach ($episode as $key => $value) {

								$type = $key;

								foreach ($episode[$key] as $key => $value) {

									if ($type != "episode" || strpos($episode[$type][$key][0][2], "2012") == false) {
										continue;
									};

							?>

								<li>
									<a href="<?php echo $hostLocation; ?>episodes/<?php echo $key; ?>/">
										<span class="title">#<?php echo $key . ": " . $episode[$type][$key][0][0]; ?></span>
										<span class="date"><?php echo $episode[$type][$key][0][2]; ?></span>
									</a>
								</li>

						<?php

								};

							};

						?>
					</ul>

				</td>

				<td>

					<ul>
						<?php

							foreach ($episode as $key => $value) {

								$type = $key;

								foreach ($episode[$key] as $key => $value) {

									if ($type != "episode" || strpos($episode[$type][$key][0][2], "2011") == false) {
										continue;
									};

							?>

								<li>
									<a href="<?php echo $hostLocation; ?>episodes/<?php echo $key; ?>/">
										<span class="title">#<?php echo $key . ": " . $episode[$type][$key][0][0]; ?></span>
										<span class="date"><?php echo $episode[$type][$key][0][2]; ?></span>
									</a>
								</li>

						<?php

								};

							};

						?>
					</ul>

				</td>

				<td>

					<ul>
						<?php

							foreach ($episode as $key => $value) {

								$type = $key;

								foreach ($episode[$key] as $key => $value) {

									if ($type != "episode" || strpos($episode[$type][$key][0][2], "2010") == false) {
										continue;
									};

							?>

								<li>
									<a href="<?php echo $hostLocation; ?>episodes/<?php echo $key; ?>/">
										<span class="title">#<?php echo $key . ": " . $episode[$type][$key][0][0]; ?></span>
										<span class="date"><?php echo $episode[$type][$key][0][2]; ?></span>
									</a>
								</li>

						<?php

								};

							};

						?>
					</ul>

				</td>

				<td>

					<ul>
						<?php

							foreach ($episode as $key => $value) {

								$type = $key;

								foreach ($episode[$key] as $key => $value) {

									if ($type != "episode" || strpos($episode[$type][$key][0][2], "2009") == false) {
										continue;
									};

							?>

								<li>
									<a href="<?php echo $hostLocation; ?>episodes/<?php echo $key; ?>/">
										<span class="title">#<?php echo $key . ": " . $episode[$type][$key][0][0]; ?></span>
										<span class="date"><?php echo $episode[$type][$key][0][2]; ?></span>
									</a>
								</li>

						<?php

								};

							};

						?>
					</ul>

				</td>

			</tr>

		</table>

	</div>

<?php include "lib/footer.php"; ?>