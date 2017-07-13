@extends('master')

@section('content')

	<main class="content columns">

		<h1>Specials</h1>

		<p>We have been fortunate enough have had the opportunity to produce and publish a number of interviews and special episodes since starting the podcast. Below are a number of the episodes we are most proud of.</p>

		<div class="columns">

			<div class="left even">

				<h2>Interviews</h2>

				<ul class="list-special">
					<li><a href="{{ route('episode', ['type' => 'episode', 'number' => 9]) }}">Gabe Newell 2009</a></li>
					<li><a href="{{ route('episode', ['type' => 'episode', 'number' => 47]) }}">Gabe Newell 2011 (Part 1)</a></li>
					<li><a href="{{ route('episode', ['type' => 'episode', 'number' => 48]) }}">Gabe Newell 2011 (Part 2)</a></li>
					<li><a href="{{ route('episode', ['type' => 'snack', 'number' => 5]) }}">Marc Laidlaw</a></li>
					<li><a href="{{ route('episode', ['type' => 'snack', 'number' => 5]) }}">Al&eacute;sia Glidewell</a></li>
					<li><a href="{{ route('episode', ['type' => 'snack', 'number' => 5]) }}">Ellen McLain</a></li>
					<li><a href="{{ route('episode', ['type' => 'snack', 'number' => 2]) }}">Harry Robins </a></li>
					<li><a href="{{ route('episode', ['type' => 'snack', 'number' => 3]) }}">Jonathan Coulton</a></li>
					<li><a href="{{ route('episode', ['type' => 'snack', 'number' => 4]) }}">Black Mesa Team</a></li>
					<li><a href="{{ route('episode', ['type' => 'snack', 'number' => 1]) }}">LambdaGeneration</a></li
				</ul>

			</div>

			<div class="right even">

				<h2>Specials</h2>

				<ul class="list-special">
					<li>
						Community Specials
						<ul>
							<li><a href="{{ route('episode', ['type' => 'episode', 'number' => 16]) }}">Left 4 Dead 2 Community Special</a></li>
							<li><a href="{{ route('episode', ['type' => 'episode', 'number' => 58]) }}">Portal 2 Community Special</a></li>
						</ul>
					</li>
					<li>
						Game Specials
						<ul>
							<li><a href="{{ route('episode', ['type' => 'episode', 'number' => 57]) }}">Portal 2 Launch Party</a></li>
							<li><a href="{{ route('episode', ['type' => 'episode', 'number' => 67]) }}">Black Mesa Team Special</a></li>
							<li><a href="{{ route('episode', ['type' => 'episode', 'number' => 105]) }}">The Beginner's Guide</a></li>
							<li><a href="{{ route('episode', ['type' => 'episode', 'number' => 12]) }}">Half-Life Special</a></li>
							<li><a href="{{ route('episode', ['type' => 'episode', 'number' => 95]) }}">Mass Effect 3 Special</a></li>
						</ul>
					</li>
					<li>
						Others
						<ul>
							<li><a href="{{ route('episode', ['type' => 'episode', 'number' => 28]) }}">LOST Special</a></li>
							<li><a href="{{ route('episode', ['type' => 'episode', 'number' => 23]) }}">April Fools' 2010</a></li>
							<li><a href="{{ route('episode', ['type' => 'episode', 'number' => 54]) }}">April Fools' 2011</a></li>
							<li><a href="{{ route('episode', ['type' => 'episode', 'number' => 93]) }}">April Fools' 2012</a></li>
							<li><a href="{{ route('episode', ['type' => 'episode', 'number' => 42]) }}">Christmas Special 2010</a></li>
							<li><a href="{{ route('episode', ['type' => 'episode', 'number' => 82]) }}">Christmas Special 2011</a></li>
						</ul>
					</li>
				</ul>

			</div>

		</div>

	</main>

@endsection
