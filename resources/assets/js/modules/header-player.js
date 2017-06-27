var Vue = require('vue');
var axios = require('axios');

var test = new Vue({
	el: '.js-player',
	template: `<div class="player js-player int" v-if="episodeData">

			<audio class="js-audio" preload="none">
				<source v-bind:src="episodeData.file" type="audio/mp3">
			</audio>

			<div class="container">

				<div class="title">
					<h1>
						<a href="episodeData.url">{{ episodeData.title }}</a>
					</h1>
					<h2>
						<a href="episodeData.url">Published <span>{{ episodeData.release }}</span></a>
					</h2>
				</div>

				<div class="time">
					<span class="time-current"></span> / <span class="time-total"></span>
				</div>

				<div class="volume">
					<div class="wrapper">
						<a class="volume-toggle" href="#"></a>
						<input class="volume-slider" type="range" value="80" min="0" max="100">
					</div>
				</div>

			</div>

			<a class="toggle playing js-play" href="#"></a>

			<div class="progress">
				<div class="progress-cover"></div>
				<div class="progress-line"></div>
			</div>

			<div class="loading">
				<div class="wrapper">
					<div class="circle circle1"></div>
					<div class="circle circle2"></div>
					<div class="circle circle3"></div>
				</div>
			</div>

		</div>`,
	data: {
		loading: true,
		episodeData: null
	},
	mounted: function() {

		var self = this;

		axios.get('/api/latest')
			.then(function(response) {
				self.episodeData = response.data;
				self.loading = false;
			})
			.catch(function(error) {
				console.log(error);
			});

	}
});





export function init() {

	return test;

}
