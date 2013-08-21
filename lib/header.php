<html>
<head>
<title>Steamcast<?php if ($pagetitle==null) {} else { echo ': ' , $pagetitle; }; ?></title>
<link rel="stylesheet" href="css/style.css" type="text/css" media="screen">
<?php if ($frontpage==true) { echo '<link rel="stylesheet" href="css/style_latest.css" type="text/css" media="screen">';} else {}; ?>
<link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="js/scripts.js"></script>
<?php if ($frontpage==true) { echo '<script type="text/javascript" src="js/latestplayer.js"></script>';} else {}; ?>
</head>
<body>

	<div id="tip">

		<div id="tip_wrapper">

			<div id="tip_left">

				<span>

					<h1>Thanks for getting in touch!</h1>

					<p>We love to hear from our listeners, and have always aimed to read and discuss every email we get on the podcast.</p>

					<p>If you would like us to discuss something, or just have something to say, feel free to give us a shout using the forms to the right or email us directly at <a href="mailto:podcast@thesteamcast.com">podcast@thesteamcast.com</a>.</p>

				</span>

			</div>

			<div id="tip_right">

				<span>

					<form>

						<label for="tip_name">Name</label>
						<input type="text" name="tip_name" id="tip_name">

						<div class="clearfix"></div>

						<label for="tip_email">Email</label>
						<input type="text" name="tip_email" id="tip_email">

						<div class="clearfix"></div>

						<label for="tip_message">Message</label>
						<textarea rows="5" name="tip_message" id="tip_message"></textarea>

						<div class="clearfix"></div>

						<div id="tip_send"><span>Send</span></div>

					</form>

				</span>

			</div>

		</div>

	</div>
	
    <div id="header" <?php if ($frontpage==true) { echo 'class="latest"'; }; ?>>
		
        <div id="header_wrapper">
			
            <div id="menu">
            
            	<div id="menu_wrapper">
					
					<ul>
						<li id="logo"><a href="index.php"><img src="img/website_logo.png" alt=""></a></li>
						<li><a href="index.php">Episodes</a></li>
						<li><a href="specials.php">Specials</a></li>
						<li><a href="about.php">About</a></li>
						<li id="tipus"><a href="#" onclick="tip_toggle();">Tip us!</a></li>
					</ul>
				
				</div>	
		
			</div>
			
			<?php if ($headertitle==null) {} else { echo '<h1 class="pagetitle">' , $headertitle, '</h1>'; }; ?>
			
			<?php

				if ($frontpage==true) {
					
					echo '<div id="latest_controls"><audio id="latest_audio"><source src="lib/test.mp3" type="audio/mp3"></audio><div id="latest_audio_toggle" onclick="latest_toggle();"></div><h1><a href="#">#100: Rise and Shine</a></h1><h2><a href="#">Published 1st December 2013</a></h2><h3><span id="latest_audio_time_current">00:00:00</span> / <span id="latest_audio_time_total">00:00:00</span></h3><div id="latest_volume"><div id="volume_button"></div><div id="volume_bar"><div id="volume_slider"></div></div></div></div>';
				
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