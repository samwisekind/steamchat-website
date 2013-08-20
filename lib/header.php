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

<div id="overlay">
		
		<div id="tip_bar">
			
			<div id="tip_wrapper">
				
				<div id="tip_text">
					
					<p><b>We love to hear from our listeners. We've always aimed to read and discuss every email we get on the podcast.</b></p>
					<p>If you would like us to discuss something on the podcast, or just have somthing to say, simply send us an email using the forms to the right!</p>
					<p>You can also email us directly at <a href="mailto:podcast@thesteamcast.com">podcast@thesteamcast.com</a> if that's how you roll.</p>
					<p id="tip_close" onclick="overlay_toggle();">Close</p>
					
				</div>
				
				<div id="tip_box">
					
					<form>
						
						<ul>
							<li>Name<br> <input type="text" name="firstname" id="tip_name"></li>
							<li>Email <span id="small">(we will never share your email address)</span><br> <input type="text" name="email" id="tip_email"></li>
							<li>Message<br> <textarea rows="4" name="message" id="tip_message"></textarea></li>
							<li id="tip_buttons"><input type="reset" value="Reset" id="tip_reset"><input type="submit" value="Submit" id="tip_submit"></li>
						</ul>
					
					</form>
				
				</div>
			
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
						<li id="tipus"><a href="#" onclick="overlay_toggle();">Tip us!</a></li>
					</ul>
				
				</div>	
		
			</div>
			
			<?php if ($headertitle==null) {} else { echo '<h1 class="pagetitle">' , $headertitle, '</h1>'; }; ?>
			
			<?php

				if ($frontpage==true) {
					
					echo '<div id="latest_controls"><audio id="latest_audio"><source src="lib/test.mp3" type="audio/mp3"></audio><div id="latest_audio_toggle" onclick="latest_toggle();"></div><h1><a href="#">#100: Rise and Shine</a></h1><h2><a href="#">Published 1st December 2013</a></h2><h3><span id="latest_audio_time_current">00:00:00</span> / <span id="latest_audio_time_total">00:00:00</span></h3></div>';
				
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