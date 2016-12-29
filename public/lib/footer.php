	</main>

	<footer id="footer">

		<div class="wrapper">

			<div class="left">
				<a href="<?php echo $hostLocation; ?>" id="footer-logo"></a>
				<ul>
					<li class="title">Here</li>
					<li><a href="<?php echo $hostLocation; ?>">Episodes</a></li>
					<li><a href="<?php echo $hostLocation; ?>specials/">Specials</a></li>
					<li><a href="<?php echo $hostLocation; ?>about/">About</a></li>
				</ul>
				<ul>
					<li class="title">Elsewhere</li>
					<li><a href="https://www.twitter.com/thesteamchat">Twitter</a></li>
					<li><a href="https://www.facebook.com/SteamchatPodcast">Facebook</a></li>
					<li><a href="http://www.steamcommunity.com/groups/SteamchatPodcast">Steam</a></li>
					<li><a href="https://www.youtube.com/Steamchat">YouTube</a></li>
				</ul>
			</div>

			<div class="right">
				<ul>
					<li>&copy; 2009-2013 Steamchat (The Steamchat, Steamchat Podcast)</li>
					<li>All Rights Reserved (<a href="http://creativecommons.org/licenses/by-nc-nd/3.0/legalcode">CC BY-NC-ND 3.0</a>)</li>
					<li>Our listeners are the best!</li>
				</ul>
			</div>

		</div>

	</footer>

	<script type="text/javascript" src="<?php echo $hostLocation; ?>js/min/scriptsGlobal.min.js"></script>
	<?php

		if ($info_page['page_type'] === 'index')
			echo '<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
			<script type="text/javascript" src="' . $hostLocation . 'js/min/scriptsIndex.min.js"></script>';

	?>

</body>
</html>