		</main>

		<footer id="footer">

			<a href="<?php echo $hostLocation; ?>" class="logo">
				<img src="http://placehold.it/200x60" alt="" class="logo-element" />
			</a>

			<p>&copy; 2009-2017 Steamchat ("The Steamchat", "Steamchat Podcast"), all rights reserved (<a href="https://www.creativecommons.org/licenses/by-nc-nd/3.0/legalcode" target="_blank" rel="noopener noreferrer">CC BY-NC-ND 3.0</a>).</p>

			<p>This website is not affiliated with, maintained, authorized, endorsed or sponsored by Valve Corporation, or any of its affiliates. All product and company names, logos, and brands are trademarks (&trade;) or registered (&reg;) trademarks of their respective owners.</p>

		</footer>

		<script type="text/javascript" src="<?php echo $hostLocation; ?>js/min/scriptsGlobal.min.js"></script>
		<?php

			if ($info_page['page_type'] === 'index')
				echo '<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
				<script type="text/javascript" src="' . $hostLocation . 'js/min/scriptsIndex.min.js"></script>';

		?>

	</body>

</html>