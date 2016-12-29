<?php

	$info_page = array(
		'page_type' => 'index'
	);

	require_once '../header.php';

?>

<section class="episodeArchives">

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
					'release_date' => date_create($db_row['release_date']),
					'file_url' => $db_row['file_url'],
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

				$release_epoch = date_format($data_episode['release_date'], 'U');
				$release_readable = date_format($data_episode['release_date'], 'jS F Y');

   				echo '<div class="episode">
   					<h2>
   						<a href="#" class="play" data-audio="' . $data_episode['file_url'] . '" onclick="playerChange(event, this);" data-header="' . $data_episode['header_mask_image'] . '" data-background="' . $data_episode['header_background_image'] . '" data-color="#' . $data_episode['header_background_colour'] . '"></a>
   						<a href="' . $hostLocation . $type_url . '/' . $data_episode['episode_number'] . '/">' . $data_episode['title'] .'</a></h2>
   						<p><span class="release js-release" data-epoch="' . $release_epoch . '">' . $release_readable . '</span>' . $data_episode['description'] . '</p>
   						<a href="episodes/' . $data_episode['episode_number'] . '/">Listen now</a>
   				</div>';

			}

		}
		else {
			die('Error');
		}

		$db_connection->close();

	?>

</section>

<?php include '../footer.php'; ?>