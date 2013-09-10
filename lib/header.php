<html>
<head>
<title>Steamcast<?php if ($pagetitle==null) {} else if ($episodepage==true) { echo ' ' , $pagetitle; } else { echo ': ' , $pagetitle; }; ?></title>
<link rel="stylesheet" href="http://localhost:82/css/style.css" type="text/css" media="screen">
<?php if ($frontpage==true) { echo '<link rel="stylesheet" href="http://localhost:82/css/style_latest.css" type="text/css" media="screen">'; } else if ($episodepage == true) { echo '<link rel="stylesheet" href="http://localhost:82/css/style_episode.css" type="text/css" media="screen">'; }; ?>
<link rel="shortcut icon" href="http://localhost:82/img/favicon.ico">
<link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800" rel="stylesheet" type="text/css">
<script type="text/javascript" src="http://localhost:82/js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="http://localhost:82/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="http://localhost:82/js/scripts.js"></script>
<?php if ($frontpage==true) { echo '<script type="text/javascript" src="http://localhost:82/js/latestplayer.js"></script>'; } else if ($episodepage == true) { echo '<script type="text/javascript" src="http://localhost:82/js/episodeplayer.js"></script>'; } ?>
</head>
<body>

	<div id="tip">

		<div id="tip_wrapper">

			<div id="tip_left">

				<span>

					<h1>Thanks for getting in touch!</h1>

					<p>We love to hear from our listeners, and have always aimed to read and discuss every email we get on the podcast.</p>

					<p>If you would like us to discuss something, or just have something to say, feel free to give us a shout using any of the methods to the right (web form coming in the next week or so)!</p>

				</span>

			</div>

			<div id="tip_right">

				<span>

					<!-- <form>

						<label for="tip_name">Name</label>
						<input type="text" name="tip_name" id="tip_name">

						<div class="clearfix"></div>

						<label for="tip_email">Email</label>
						<input type="text" name="tip_email" id="tip_email">

						<div class="clearfix"></div>

						<label for="tip_message">Message</label>
						<textarea rows="7" name="tip_message" id="tip_message"></textarea>

						<div class="clearfix"></div>

						<div id="tip_send"><span>Send</span></div>

					</form> -->

					<ul id="tipus_methods">
						<li><a href="mailto:podcast@thesteamcast.com" id="tipus_methods_email">Email (podcast@thesteamcast.com)</a></li>
						<li><a href="http://www.twitter.com/Steamcast" id="tipus_methods_twitter">Twitter (@Steamcast)</a></li>
						<li><a href="http://www.facebook.com/Steamcast" id="tipus_methods_facebook">Facebook</a></li>
						<li><a href="http://www.steamcommunity.com/groups/Steamcast" id="tipus_methods_steam">Steam</a></li>
						<li><a href="http://www.youtube.com/Steamcast" id="tipus_methods_youtube">YouTube</a></li>
					</ul>

				</span>

			</div>

		</div>

	</div>
	
    <div id="header" <?php if ($frontpage==true) { echo 'class="latest"'; }; ?>>
		
        <div id="header_wrapper">
			
            <div id="menu">
            
            	<div id="menu_wrapper">
					
					<ul>
						<li id="logo"><a href="http://localhost:82/"><img src="http://localhost:82/img/website_logo.png" alt=""></a></li>
						<li><a href="http://localhost:82/">Episodes</a></li>
						<li><a href="http://localhost:82/specials/">Specials</a></li>
						<li><a href="http://localhost:82/about/">About</a></li>
						<li id="tipus"><a href="#" onclick="tip_toggle();">Tip us!</a></li>
					</ul>
				
				</div>	
		
			</div>
			
			<?php if ($headertitle==null) {} else { echo '<h1 class="pagetitle">' , $headertitle, '</h1>'; }; ?>
			
			<?php

				if ($frontpage==true) {
					
					echo '<div id="latest_controls"><audio id="latest_audio"><source src="http://localhost:82/episodes/100/steamcast_episode100.mp3" type="audio/mp3"></audio><div id="latest_audio_toggle"></div><h1><a href="http://localhost:82/episodes/100/">#100: Rise and Shine</a></h1><h2><a href="http://localhost:82/episodes/100/">Published 10th September 2013</a></h2><h3><span id="latest_audio_time_current">00:00:00</span> / <span id="latest_audio_time_total">00:55:27</span></h3><div id="latest_volume"><div id="volume_button"></div><div id="volume_bar"><div id="volume_slider"></div></div></div></div>';
				
				}
				
				else {};
			
			?>
			
		</div>
		
					<?php

				if ($frontpage==true) {
					
					echo '<div id="latest_progress_wrapper"><div id="latest_progress_line"></div><div id="latest_progress"></div></div>';
				
				}
				
				else {};
			
			?>
	
	</div>