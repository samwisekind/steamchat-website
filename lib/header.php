<?php $hostLocation = "http://localhost:8888/steamcast-website/"; ?>

<html>
	<head>
		<title>Steamcast<?php if ($pageType == "???") { echo " " , $pageTitle; } else if ($pageType == "episode") { echo ': ' , $pageTitle; }; ?></title>
		<link rel="stylesheet" href="<?php echo $hostLocation; ?>css/styleGlobal.min.css" type="text/css" media="screen">
		<link rel="stylesheet" href="<?php echo $hostLocation; ?>css/style<?php echo ucfirst($pageType) ?>.css" type="text/css" media="screen">
		<link rel="shortcut icon" href="<?php echo $hostLocation; ?>img/favicon.ico">
		<link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800" rel="stylesheet" type="text/css">
		<script type="text/javascript" src="<?php echo $hostLocation; ?>js/scriptsGlobal.js"></script>
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
						<li><a href="mailto:podcast@thesteamcast.com" id="tipus_methods_email">Email (podcast@thesteamcast.com)</a></li>
						<li><a href="http://www.twitter.com/Steamcast" id="tipus_methods_twitter">Twitter (@Steamcast)</a></li>
						<li><a href="http://www.facebook.com/Steamcast" id="tipus_methods_facebook">Facebook</a></li>
						<li><a href="http://www.steamcommunity.com/groups/Steamcast" id="tipus_methods_steam">Steam</a></li>
						<li><a href="http://www.youtube.com/Steamcast" id="tipus_methods_youtube">YouTube</a></li>
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
			
			<?php /* if ($headertitle==null) {} else if ($episodepage=true) { echo '<h1 class="pagetitle episode">' , $headertitle, '</h1><h1 class="pagedate episode">Published ' , $headerdate, '</h1>'; } else { echo '<h1 class="pagetitle">' , $headertitle, '</h1>'; }; */ ?>
			
			<?php

				if ($pageType == "index") {
					require_once "latestPlayer.php";
				};
			
			?>
		
		</header>