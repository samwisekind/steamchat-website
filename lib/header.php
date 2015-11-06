<?php

	require_once "common.php";

	if ($pageType == "index") {
		$metaTitle = ": A Podcast On All Things Valve";
	}
	else if ($pageType == "episode") {
		$metaTitle = " " . ucfirst($episodeType) . " #" . $episodeNumber . ": " . $episodeTitle;
	}
	else if ($pageType = "misc") {
		$metaTitle = ": " . $pageTitle;
	};

?>

<html>
	<head>
		<title>Steamchat<?php echo $metaTitle; ?></title>
		<link rel="stylesheet" href="<?php echo $hostLocation; ?>css/styleGlobal.min.css" type="text/css" media="screen">
		<link rel="stylesheet" href="<?php echo $hostLocation; ?>css/style<?php echo ucfirst($pageType) ?>.css" type="text/css" media="screen">
		<link rel="shortcut icon" href="<?php echo $hostLocation; ?>img/favicon.ico">
		<link href="//fonts.googleapis.com/css?family=Oxygen:300,400,700<?php echo "|Lato"; ?>" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="<?php echo $hostLocation; ?>js/scriptsGlobal.js"></script>
		<?php
			if ($pageType == "index") { echo '
				<script type="text/javascript" src="' . $hostLocation . 'js/jquery-2.1.4.min.js"></script>
				<script type="text/javascript" src="' . $hostLocation . 'js/jquery-ui.min.js"></script>
				<script type="text/javascript" src="' . $hostLocation . 'js/scriptsIndex.js"></script>';
			};
		?>
	</head>

	<body class="<?php echo $pageType; ?>">

		<aside id="headerTip">

			<div class="wrapper">

				<div class="left">

					<h2>Thanks for getting in touch!</h2>

					<p>We love to hear from our listeners, and have always aimed to read and discuss every email we get on the podcast.</p>

					<p>If you would like us to discuss something, or just have something to say, feel free to give us a shout using any of the methods to the right!</p>

				</div>

				<div class="right">

					<ul>
						<li><a href="mailto:podcast@thesteamchat.com" id="tipus_methods_email">Email (podcast@thesteamchat.com)</a></li>
						<li><a href="https://www.twitter.com/thesteamchat" id="tipus_methods_twitter">Twitter (@Steamchat)</a></li>
						<li><a href="http://www.facebook.com/SteamchatPodcast" id="tipus_methods_facebook">Facebook</a></li>
						<li><a href="http://www.steamcommunity.com/groups/SteamchatPodcast" id="tipus_methods_steam">Steam</a></li>
						<li><a href="http://www.youtube.com/Steamchat" id="tipus_methods_youtube">YouTube</a></li>
					</ul>

				</div>

			</div>

		</aside>

		<header id="header" <?php if ($pageType == "index") { echo "style='background-image: url(episodes/" . $latestEpisode . "/episode" . $latestEpisode . "_latest_image.jpg);'"; }; ?>>

			<nav id="headerMenu" <?php if ($pageType == "index") { echo "style='background-image: url(episodes/" . $latestEpisode . "/episode" . $latestEpisode . "_latest_overlay.png);'"; }; ?>>

				<div id="headerLogo"><a href="<?php echo $hostLocation; ?>"></a></div>

				<ul>
					<li><a href="<?php echo $hostLocation; ?>">Episodes</a></li>
					<li><a href="<?php echo $hostLocation; ?>specials/">Specials</a></li>
					<li><a href="<?php echo $hostLocation; ?>about/">About</a></li>
				</ul>

				<div id="headerMenu-tip">
					<a href="#" onclick="tipToggle(event)">Tip us!</a>
				</li>

			</nav>

			<?php

				if ($pageType == "index") {
					require_once "latestPlayer.php";
				};

			?>

		</header>

		<main id="content">