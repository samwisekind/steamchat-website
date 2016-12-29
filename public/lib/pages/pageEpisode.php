<?php

	require_once '../common.php';

	$episodeNumber = $_GET['number'];
	$episodeType = $_GET['type'];

	$db_query = 'SELECT *
		FROM ' . $db_info['database_name'] . '.episodes
		WHERE episode_type = "' . $episodeType . '" AND episode_number = ' . $episodeNumber;

	$db_result = $db_connection->query($db_query);
	$db_row = $db_result->fetch_assoc();

	if (($episodeType !== 'NORMAL' && $episodeType !== 'SNACK') || !is_numeric($episodeNumber) || $db_row === null) {
		header('Location: ' . $hostLocation);
		die();
	}

	$data_episode = array(
		'episode_type' => $db_row['episode_type'],
		'episode_number' => $db_row['episode_number'],
		'title' => $db_row['title'],
		'description' => $db_row['description'],
		'release_date' => date_create($db_row['release_date']),
		'file_size' => $db_row['file_size'],
		'file_url' => $db_row['file_url'],
		'file_duration' => $db_row['file_duration']
	);

	if (isset($_GET['download']) === 1) {

		$head = array_change_key_case(get_headers($data_episode['file_url'], TRUE));
		$file_size = $head['content-length'];

		header('Content-Type: audio/mpeg');
		header('Content-Transfer-Encoding: Binary');
		header('Content-Length: ' . $file_size);
		header('Content-disposition: attachment; filename=\'' . basename($data_episode['file_url'], '.mp3') . '.mp3\'');
		readfile($data_episode['file_url']);
		exit;

	};

	if ($data_episode['episode_type'] === 'NORMAL') {
		$data_episode['title'] = 'Episode #' . $data_episode['episode_number'] . ': ' . $data_episode['title'];
	}
	else if ($data_episode['episode_type'] === 'SNACK') {
		$data_episode['title'] = 'Snack #' . $data_episode['episode_number'] . ': ' . $data_episode['title'];
	}

	$info_page = array(
		'page_type' => 'episode',
		'page_title' => $data_episode['title'],
		'page_description' => '(Released ' . date_format($data_episode['release_date'], 'j/m/Y') . ') ' . $data_episode['description'],
		'page_episode_number' => $data_episode['episode_number'],
		'page_episode_length' => $data_episode['file_duration']
	);

	require_once '../header.php';

?>

<div class="wrapper">

	<div class="main">

		<h1><?php echo $data_episode['title']; ?></h1>
		<h2>Published <?php echo date_format($data_episode['release_date'], 'jS F Y'); ?></h2>
		<p><?php echo $data_episode['description']; ?></p>

		<audio controls preload="none" class="player js-player">
			<source src="<?php echo $data_episode['file_url']; ?>" type="audio/mp3">
		</audio>

	</div>

	<div class="sidebar">

		<ul>
			<li class="title">Episode Info</li>
			<li><span class="light">Duration:</span> <?php echo $data_episode['file_duration']; ?></li>
			<li><span class="light">Size:</span> <?php echo number_format($data_episode['file_size'] / 1048576, 2); ?> MB</li>
			<li><span class="light">Format:</span> MP3</li>
		</ul>

		<ul>
			<li class="title">Episode Tools</li>
			<li><a href="#" onclick="episodeToggle(event)">Listen Now</a></li>
			<li><a href="<?php echo $data_episode['file_url']; ?>">Direct Link</a></li>
			<li><a href="<?php echo $_SERVER['REQUEST_URI'] . 'download'; ?>">Download MP3</a></li>
		</ul>

	</div>

</div>

<ul class="navigation">

	<?php

		function generateElement ($class, $data) {

			global $hostLocation;

			switch ($data['episode_type']) {
				case 'NORMAL':
					$type_url = 'episodes';
					break;
				case 'SNACK':
					$type_url = 'snacks';
					break;
			}

			switch ($class) {
				case 'prev':
					$label_text = 'Previously:';
					break;
				case 'next':
					$label_text = 'Up next:';
					break;
			}

			echo '<li class="' . $class . '">
				<a href="' . $hostLocation . $type_url . '/' . $data['episode_number'] . '/">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 70" class="arrow">
						<path d="M0,35,30.9,0,32,1,2,35,32,69l-1.1,1Z" style="fill:#999" />
					</svg>
					<span class="wrapper">
						<span class="small label">' . $label_text . '</span>
						<span class="title">#' . $data['episode_number'] . ': ' . $data['title'] . '</span>
						<span class="small">' . date_format(date_create($data['release_date']), 'j/m/Y') . '</span>
					</span>
				</a>
			</li>';

		}

		// Previous episode

		$db_query = 'SELECT *
		FROM ' . $db_info['database_name'] . '.episodes
		WHERE episode_type = "' . $episodeType . '" AND episode_number = ' . (intval($episodeNumber) - 1);

		$db_result = $db_connection->query($db_query);
		$db_row = $db_result->fetch_assoc();

		if ($db_row !== null) {
			generateElement('prev', $db_row);
		}

		// Next episode

		$db_query = 'SELECT *
		FROM ' . $db_info['database_name'] . '.episodes
		WHERE episode_type = "' . $episodeType . '" AND episode_number = ' . (intval($episodeNumber) + 1);

		$db_result = $db_connection->query($db_query);
		$db_row = $db_result->fetch_assoc();

		if ($db_row !== null) {
			generateElement('next', $db_row);
		}

	?>

</ul>

<?php require_once '../footer.php'; ?>