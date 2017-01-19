<?php

	$info_page = array(
		'page_type' => 'index'
	);

	require_once '../header.php';

?>

<section class="archives js-archives">

	<div class="sidebar js-sidebar">

		<div class="wrapper">

			<h2>Search</h2>
			<input type="search" placeholder="Filter by keywords..." class="search js-search" />

			<h2>Filter years</h2>
			<ul class="filter year">
				<?php

					$years = array();

					$db_query = 'SELECT DISTINCT YEAR(release_date)
						FROM ' . $db_info['database_name'] . '.episodes
						ORDER BY release_date DESC';

					$db_result = $db_connection->query($db_query);

					while ($db_row = $db_result->fetch_assoc()) {
						array_push($years, $db_row['YEAR(release_date)']);
					}

					function returnElement ($year) {
						return '<li><input type="checkbox" id="year-' . $year . '" value="' . $year . '" class="input js-checkbox" checked /><label for="year-' . $year . '" class="label">' . $year . '</label></li>';
					}

					for ($i = 0; $i < count($years); $i++) {
						echo returnElement($years[$i]);
					}

				?>
			</ul>

			<h2>Filter type</h2>
			<ul class="filter types">
				<li><input type="radio" name="type" id="type-all" value="type-all" class="input js-radio" checked /><label for="type-all" class="label">All</label></li>
				<li><input type="radio" name="type" id="type-interview" value="type-interview" class="input js-radio" /><label for="type-interview" class="label"><span data-type="interview" class="type interview">Interview</span></label></li>
	   			<li><input type="radio" name="type" id="type-game" value="type-game" class="input js-radio" /><label for="type-game" class="label"><span data-type="game" class="type game">Game Special</span></label></li>
	   			<li><input type="radio" name="type" id="type-event" value="type-event" class="input js-radio" /><label for="type-event" class="label"><span data-type="event" class="type event">Event Special</span></label></li>
			</ul>

		</div>

		<span class="count js-count"></span>
		<a href="#" class="reset js-reset">Reset filters</a>

	</div>

	<div class="list">

		<?php

			$db_query = 'SELECT *
				FROM ' . $db_info['database_name'] . '.episodes
				ORDER BY release_date DESC';
			$db_result = $db_connection->query($db_query);

			if ($db_result->num_rows > 0) {

				while ($db_row = $db_result->fetch_assoc()) {

					$data_episode = array(
						'episode_type' => $db_row['episode_type'],
						'episode_number' => $db_row['episode_number'],
						'title' => $db_row['title'],
						'description' => $db_row['description'],
						'keywords' => $db_row['keywords'],
						'release_date' => date_create($db_row['release_date']),
						'file_url' => $db_row['file_url'],
						'file_duration' => $db_row['file_duration'],
						'header_mask_image' => $db_row['header_mask_image'],
						'header_background_colour' => $db_row['header_mask_colour'],
						'header_background_image' => $db_row['header_background_image']
					);

					if ($data_episode['episode_type'] === 'NORMAL') {
						$data_episode['title'] = '#' . $data_episode['episode_number'] . ': ' . $data_episode['title'];
						$type_url = 'episodes';
					}
					else if ($data_episode['episode_type'] === 'SNACK') {
						$data_episode['title'] = 'Snack: ' . $data_episode['title'];
						$type_url = 'snacks';
					}

					$release_readable = date_format($data_episode['release_date'], 'jS F Y');

					echo '<div class="episode js-episode" data-year="' .date_format($data_episode['release_date'], 'Y') . '" data-keywords="' . $data_episode['keywords'] . '">
						<a href="#" class="play" data-audio="' . $data_episode['file_url'] . '" onclick="playerChange(event, this);" data-header="' . $data_episode['header_mask_image'] . '" data-background="' . $data_episode['header_background_image'] . '" data-color="#' . $data_episode['header_background_colour'] . '"></a>
						<h2>
							<a href="' . $hostLocation . $type_url . '/' . $data_episode['episode_number'] . '/">' . $data_episode['title'] .'</a></h2>
							<h3><span>' . $release_readable . '</span> – ' . $data_episode['file_duration'] . '</h3>
							<p>' . $data_episode['description'] . '</p>
							<ul class="types">
								<li><span class="type interview">Interview</span></li>
								<li><span class="type game">Game Special</span></li>
								<li><span class="type event">Event Special</span></li>
							</ul>
					</div>';

				}

			}
			else {
				die('Error');
			}

			$db_connection->close();

		?>

		<div class="no-results">No episodes to show (<a href="#" class="js-reset">reset filters?</a>)</div>

	</div>

</section>

<?php include '../footer.php'; ?>