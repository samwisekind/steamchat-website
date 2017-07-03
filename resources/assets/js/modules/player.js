function player(element) {

	var Vue = require('vue');
	var axios = require('axios');

	return new Vue({
		el: element,
		template: `<div class="player" v-bind:class="{ loading: isLoading, playing: isPlaying }" v-bind:style="{ backgroundImage: playerBackground, backgroundColor: playerColour }">

				<audio v-if="episodeData" preload="none" ref="audioElement" v-on:loadedmetadata="loaded" v-on:timeupdate="updateTime" v-on:ended="isPlaying = false">
					<source v-bind:src="episodeData.file" type="audio/mp3">
				</audio>

				<a class="toggle" href="#" v-on:click="togglePlay(!isPlaying)">
					<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" class="toggle-element">
						<path d="M50 10a40 40 0 1 1-40 40 40 40 0 0 1 40-40m0-10a50 50 0 1 0 50 50A50 50 0 0 0 50 0z" class="layer outline" />
						<path d="M69.63 46.45L43.25 28.3a4.31 4.31 0 0 0-6.75 3.55v36.3a4.31 4.31 0 0 0 6.75 3.55l26.38-18.15a4.31 4.31 0 0 0 0-7.1z" class="layer play" />
						<path d="M68 33.8v32.4a6.26 6.26 0 0 1-12.51 0V33.8a6.26 6.26 0 0 1 12.51 0zm-29.74-6.26A6.26 6.26 0 0 0 32 33.8v32.4a6.26 6.26 0 0 0 12.51 0V33.8a6.26 6.26 0 0 0-6.25-6.26z" class="layer pause" />
						<path d="M50 27.52a2.08 2.08 0 0 1 2.16 2.16v8.45A2.15 2.15 0 0 1 50 40.38a2.23 2.23 0 0 1-2.25-2.25v-8.45A2.15 2.15 0 0 1 50 27.52zm-10.16 4.77l4.95 6.83A2.21 2.21 0 0 1 43 42.63a2 2 0 0 1-1.71-.9l-4.95-6.83a2.18 2.18 0 1 1 3.51-2.61zM30 45.86a2.22 2.22 0 1 1 1.35-4.23l8 2.61A2.22 2.22 0 0 1 40.83 47a2.33 2.33 0 0 1-2.16 1.53 1.67 1.67 0 0 1-.63-.18zM40.83 53a2.22 2.22 0 0 1-1.44 2.79l-8 2.61a2 2 0 0 1-.72.09 2.21 2.21 0 0 1-.67-4.35l8-2.61A2.22 2.22 0 0 1 40.83 53zm3.51 4.86a2.16 2.16 0 0 1 .45 3.06l-4.95 6.83a2.1 2.1 0 0 1-1.8.9 2.18 2.18 0 0 1-1.71-3.51l4.95-6.83a2.16 2.16 0 0 1 3.06-.49zM50 59.62a2.15 2.15 0 0 1 2.16 2.25v8.36A2.15 2.15 0 0 1 50 72.48a2.23 2.23 0 0 1-2.25-2.25v-8.36A2.23 2.23 0 0 1 50 59.62zm8.72-1.35l4.95 6.83a2.21 2.21 0 0 1-1.8 3.51 2 2 0 0 1-1.71-.9l-4.95-6.83a2.18 2.18 0 0 1 3.51-2.61zM70 54.14a2.22 2.22 0 0 1 1.44 2.79 2.33 2.33 0 0 1-2.16 1.53 1.53 1.53 0 0 1-.63-.09l-8-2.61A2.22 2.22 0 0 1 62 51.53zM59.17 47a2.22 2.22 0 0 1 1.44-2.79l8-2.61A2.22 2.22 0 1 1 70 45.86l-8 2.52a2.12 2.12 0 0 1-.72.18A2.21 2.21 0 0 1 59.17 47zm-2.25-4.41a2.18 2.18 0 0 1-1.71-3.51l4.95-6.83a2.18 2.18 0 0 1 3.51 2.61l-4.95 6.83a2.1 2.1 0 0 1-1.8.94z" class="layer loading" />
					</svg>
				</a>

				<div class="container">

					<div v-show="episodeData.url" class="title">
						<h1><a v-bind:href="episodeData.url">{{ episodeData.title }}</a></h1>
						<h2><a v-bind:href="episodeData.url">Published <span>{{ episodeData.release }}</span></a></h2>
					</div>

					<div class="time" v-show="isReady">
						<span class="time-current" v-text="durationCurrent"></span><span class="slash">/</span><span class="time-total" v-text="durationTotal"></span>
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
			globalMenu: document.body.getElementsByClassName('js-menu')[0]
		},
		methods: {
			getEpisode: function(episode, autoplay) {

				this.episodeData = false;
				this.isLoading = true;
				this.isPlaying = this.isReady = false;
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

						if (self.episodeData.mask !== null) {
							self.globalMenu.style.backgroundImage = 'url(' + self.episodeData.mask + ')';
							self.globalMenu.style.backgroundColor = 'transparent';
						}
						else {
							self.globalMenu.style.backgroundImage = null;
							self.globalMenu.style.backgroundColor = '#FFFFFF';
						}

						if (autoplay === true) {
							setTimeout(function() {
								self.$refs.audioElement.load();
							}, 0);
						}
						else {
							self.isLoading = false;
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

				if (this.isLoading === false) {

					if (this.isReady === false) {
						this.isLoading = true;
						this.$refs.audioElement.load();
					}
					else {

						if (target === false) {
							this.$refs.audioElement.pause();
						}
						else if (target === true) {
							this.$refs.audioElement.play();
						}

						this.isPlaying = target;

					}

				}

			},
			stop: function() {
				this.$refs.audioElement.pause();
				this.isPlaying = false;
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

			var self = this;

			var loadEpisode = function(event) {
				event.preventDefault();
				self.getEpisode(this.getAttribute('data-id'), true);
				window.scrollTo(0, 0);
			};

			var buttons = document.body.getElementsByClassName('js-play');

			for (var i = 0; i < buttons.length; i++) {
				buttons[i].addEventListener('click', loadEpisode);
			}

			window.addEventListener('resize', function() {
				if (window.innerWidth <= 650) {
					self.stop();
				}
			});

		}
	});

}

export function init(element) {

	return player(element);

}
