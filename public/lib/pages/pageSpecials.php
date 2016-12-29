<?php

	require_once '../common.php';

	$info_page = array(
		'page_type' => 'misc',
		'page_title' => 'Specials'
	);

	require_once '../header.php';

?>

<h1>Specials</h1>

<p>We have been fortunate enough have had the opportunity to produce and publish a number of interviews and special episodes since starting the podcast. Below are a number of the episodes we are most proud of.</p>

<div class="columns">

	<div class="left">

		<h2>Interviews</h2>

		<ul class="list-special">
			<li><a href="<?php echo $hostLocation; ?>episodes/9/">Gabe Newell 2009</a></li>
			<li><a href="<?php echo $hostLocation; ?>episodes/47/">Gabe Newell 2011 (Part 1)</a></li>
			<li><a href="<?php echo $hostLocation; ?>episodes/48/">Gabe Newell 2011 (Part 2)</a></li>
			<li><a href="<?php echo $hostLocation; ?>pages/portal2party/">Marc Laidlaw (former lead writer at Valve)</a></li>
			<li><a href="<?php echo $hostLocation; ?>pages/portal2party/">Alesia Glidewell (voice of Alyx)</a></li>
			<li><a href="<?php echo $hostLocation; ?>pages/portal2party/">Ellen McLain (voice of GLaDOS)</a></li>
			<li><a href="<?php echo $hostLocation; ?>snacks/2/">Harry Robins (voice of Dr. Kleiner)</a></li>
			<li><a href="<?php echo $hostLocation; ?>snacks/3/">Jonathan Coulton (Portal songwriter)</a></li>
			<li><a href="<?php echo $hostLocation; ?>snacks/4/">Black Mesa Mod Team</a></li>
			<li><a href="<?php echo $hostLocation; ?>snacks/1/">LambdaGeneration</a></li
		</ul>

	</div>

	<div class="right">

		<h2>Specials</h2>

		<ul class="list-special">
			<li>
				Games
				<ul>
					<li><a href="<?php echo $hostLocation; ?>episodes/67/">Black Mesa Mod Team Special</a></li>
					<li><a href="<?php echo $hostLocation; ?>episodes/12/">Half-Life Special</a></li>
					<li><a href="<?php echo $hostLocation; ?>episodes/16/">Left 4 Dead 2 Special</a></li>
					<li><a href="<?php echo $hostLocation; ?>episodes/21/">Portal 2 Special (Part 1)</a></li>
					<li><a href="<?php echo $hostLocation; ?>episodes/22/">Portal 2 Special (Part 2)</a></li>
					<li><a href="<?php echo $hostLocation; ?>episodes/95/">Mass Effect 3 Special</a></li>
				</ul>
			</li>
			<li>
				Events
				<ul>
					<li><a href="<?php echo $hostLocation; ?>episodes/104/">E3 2016 Special</a></li>
					<li><a href="<?php echo $hostLocation; ?>episodes/29/">E3 2010 Special (Part 1)</a></li>
					<li><a href="<?php echo $hostLocation; ?>episodes/30/">E3 2010 Special (Part 2)</a></li>
					<li><a href="<?php echo $hostLocation; ?>episodes/31/">E3 2010 Special (Part 3)</a></li>
				</ul>
			</li>
			<li>
				Other
				<ul>
					<li><a href="<?php echo $hostLocation; ?>episodes/28/">LOST Special</a></li>
					<li><a href="<?php echo $hostLocation; ?>episodes/23/">April Fools' 2010</a></li>
					<li><a href="<?php echo $hostLocation; ?>episodes/54/">April Fools' 2011</a></li>
					<li><a href="<?php echo $hostLocation; ?>episodes/93/">April Fools' 2012</a></li>
					<li><a href="<?php echo $hostLocation; ?>episodes/42/">Christmas Special 2010</a></li>
					<li><a href="<?php echo $hostLocation; ?>episodes/82/">Christmas Special 2011</a></li>
				</ul>
			</li>
		</ul>

	</div>

</div>

<?php require_once '../footer.php'; ?>