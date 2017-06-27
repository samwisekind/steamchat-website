function player(element) {

	var Vue = require('vue');
	var axios = require('axios');

	return new Vue({
		el: element,
		template: `<div class="player" v-bind:class="{ playing: isPlaying }" v-bind:style="{ backgroundImage: playerBackground, backgroundColor: playerColour }">

				<audio v-if="episodeData" preload="none" ref="audioElement" v-on:loadedmetadata="loaded" v-on:timeupdate="updateTime" v-on:ended="isPlaying = false">
					<source v-bind:src="episodeData.file" type="audio/mp3">
				</audio>

				<a v-show="!isLoading" class="toggle" href="#" v-on:click="togglePlay(!isPlaying)"></a>

				<div class="container">

					<div v-show="episodeData.url" class="title">
						<h1><a v-bind:href="episodeData.url">{{ episodeData.title }}</a></h1>
						<h2><a v-bind:href="episodeData.url">Published <span>{{ episodeData.release }}</span></a></h2>
					</div>

					<div class="time" v-show="isReady">
						<span class="time-current" v-text="durationCurrent"></span> / <span class="time-total" v-text="durationTotal"></span>
					</div>

					<div class="volume" v-show="isReady">
						<a class="volume-toggle" href="#" v-on:click="toggleMute" v-bind:class="{ muted: isMuted }"></a>
						<input class="volume-slider" type="range" value="80" min="0" max="100" v-model="volume">
					</div>

				</div>

				<div v-show="isReady" class="progress" v-on:mouseenter="movingLine = true" v-on:mouseleave="movingLine = false" v-on:mousemove="moveLine" v-on:click="changeTime">
					<div v-show="movingLine" class="progress-line" v-bind:style="{ left: linePosition }"></div>
					<div class="progress-cover" v-bind:style="{ width: progressWidth }"></div>
				</div>

			</div>`,
		data: {
			episodeData: false,
			pageTitle: document.title,
			isLoading: true,
			isReady: false,
			isPlaying: false,
			currentTime: 0,
			hoverTime: 0,
			movingLine: false,
			lineHover: null,
			volume: 100,
			globalMenu: null
		},
		methods: {
			getEpisode: function(episode, autoplay) {

				this.episodeData = false;
				this.isLoading = true;
				this.isPlaying = false;
				this.isReady = false;
				this.currentTime = 0;

				var self = this;

				if (episode === 'latest') {
					episode = '/api/latest';
				}
				else {
					episode = '/api/episode/' + episode;
				}

				axios.get(episode)
					.then(function(response) {

						self.episodeData = response.data;
						self.isLoading = false;

						if (self.episodeData.mask !== null) {
							self.globalMenu.style.backgroundImage = 'url(' + self.episodeData.mask + ')';
							self.globalMenu.style.backgroundColor = 'transparent';
						}
						else {
							self.globalMenu.style.backgroundImage = null;
							self.globalMenu.style.backgroundColor = null;
						}

						if (autoplay === true) {
							setTimeout(function() {
								self.togglePlay(true);
							}, 0);
						}

					})
					.catch(function(error) {
						console.error(error);
					});

			},
			loaded: function() {
				this.isReady = true;
				this.isLoading = false;
				this.togglePlay(true);
			},
			togglePlay: function(target) {

				if (this.isReady === false && this.isLoading !== true) {

					this.isLoading = true;
					this.isPlaying = true;
					this.$refs.audioElement.load();

				}
				else if (this.isLoading === false) {

					if (target === false) {
						this.$refs.audioElement.pause();
					}
					else if (target === true) {
						this.$refs.audioElement.play();
					}
					this.isPlaying = target;

				}

			},
			moveLine: function(event) {
				this.lineHover = ((event.pageX - 2) / window.innerWidth) * 100;
				this.hoverTime = this.$refs.audioElement.duration * (event.pageX / window.innerWidth);
			},
			changeTime: function(event) {

				if (this.isReady === true) {
					var coordinateX = event.pageX / window.innerWidth;
					this.$refs.audioElement.currentTime = this.$refs.audioElement.duration * coordinateX;
					this.updateTime();
				}

			},
			updateTime: function() {
				if (this.isReady === true) {
					this.currentTime = this.$refs.audioElement.currentTime;
				}
				else {
					return null;
				}
			},
			formatTime: function(target) {

				target = Number(target);
				var hours = Math.floor(target / 3600),
					minutes = Math.floor(target % 3600 / 60),
					seconds = Math.floor(target % 3600 % 60);
				return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

			},
			toggleMute: function() {

				if (this.volume === 0) {
					this.volume = 100;
				}
				else {
					this.volume = 0;
				}

			}
		},
		computed: {
			durationCurrent: function() {

				if (this.isReady === true) {
					if (this.movingLine === true) {
						return this.formatTime(this.hoverTime);
					}
					else {
						return this.formatTime(this.currentTime);
					}
				}
				else {
					return false;
				}

			},
			durationTotal: function() {

				if (this.isReady === true) {
					return this.formatTime(this.$refs.audioElement.duration);
				}
				else {
					return false;
				}

			},
			linePosition: function() {

				if (this.isReady === true && this.movingLine === true) {
					return this.lineHover + '%';
				}
				else {
					return this.progressWidth;
				}

			},
			progressWidth: function() {

				var targetWidth;

				if (this.isReady === true) {
					targetWidth = (this.currentTime / this.$refs.audioElement.duration) * 100;
				}
				else {
					targetWidth = 0;
				}

				return targetWidth + '%';

			},
			isMuted: function() {
				return parseInt(this.volume, 10) === 0;
			},
			playerBackground: function() {
				if (this.episodeData !== false && this.episodeData.background !== null) {
					return 'url(' + this.episodeData.background + ')';
				}
				else {
					return null;
				}
			},
			playerColour: function() {
				if (this.episodeData !== false && this.episodeData.colour !== null) {
					return this.episodeData.colour;
				}
				else {
					return null;
				}
			}
		},
		watch: {
			isPlaying: function(value) {
				if (value === true) {
					document.title = 'Playing ' + this.episodeData.title;
				}
				else {
					document.title = this.pageTitle;
				}
			},
			volume: function(value) {
				if (this.isReady === true) {
					this.$refs.audioElement.volume = parseInt(value, 10) * 0.01;
				}
			}
		},
		mounted: function() {

			this.getEpisode('latest', false);

			this.globalMenu = document.body.getElementsByClassName('js-menu')[0];

			var self = this;

			var loadEpisode = function(event) {
				event.preventDefault();
				self.getEpisode(this.getAttribute('data-id'), true);
			};

			var buttons = document.body.getElementsByClassName('js-play');

			for (var i = 0; i < buttons.length; i++) {
				buttons[i].addEventListener('click', loadEpisode);
			}

		}
	});

}

export function init(element) {

	return player(element);

}
