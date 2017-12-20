function player(element) {
	const Vue = require('vue');

	return new Vue({
		el: element,
		template: `<div class="player" v-bind:class="{ loading: isLoading, buffering: isBuffering, playing: isPlaying }" v-bind:style="{ backgroundImage: playerBackground, backgroundColor: playerColour }">

				<audio v-if="episodeData" preload="none" ref="audioElement" v-on:canplay="loaded" v-on:loadeddata="loaded" v-on:timeupdate="updateTime" v-on:waiting="isBuffering = true" v-on:ended="isPlaying = false">
					<source v-bind:src="episodeData.file" type="audio/mp3">
				</audio>

				<a class="link" v-bind:href="episodeData.url"></a>

				<a class="toggle" href="#" v-on:click="togglePlay(!isPlaying, $event)">
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
						<a class="volume-toggle" href="#" v-on:click="toggleMute($event)" v-bind:class="{ muted: isMuted }"></a>
						<input class="volume-slider" type="range" value="80" min="0" max="100" v-model="volume">
					</div>

				</div>

				<div v-show="isReady" class="progress" v-on:mouseenter="movingLine = true" v-on:mouseleave="movingLine = false" v-on:mousemove="moveLine" v-on:click="changeTime">
					<div v-show="movingLine" class="progress-line" v-bind:style="{ left: linePosition }"></div>
					<div class="progress-cover" v-bind:style="{ width: progressWidth }"></div>
				</div>

			</div>`,
		data: {
			episodeData: false, // Episode data JSON object
			pageTitle: document.title, // Store the default document title
			isLoading: true, // Boolean to show/hide loading state
			isBuffering: false, // Boolean to show/hide buffering state
			isReady: false, // Boolean for the audio element 'loadedmetadata' event
			isPlaying: false, // Boolean to show/hide loading state
			currentTime: 0, // Audio element current time in seconds
			hoverTime: 0, // Seek line hover-position in seconds relative to total duration
			movingLine: false, // Boolean for seek line state
			lineHover: null, // Seek line hover-position percentage (from 0 to 100)
			volume: 100, // Volume for audio element
			globalMenu: document.body.getElementsByClassName('js-menu')[0] // Store the global header menu element
		},
		methods: {
			getEpisode: function(episode, autoplay) {
				const self = this;

				// Clear episode data and reset player state
				this.episodeData = false;
				this.isLoading = true;
				this.isPlaying = this.isReady = false;
				this.currentTime = 0;

				if (episode === 'latest') {
					episode = '/api/latest';
				}
				else {
					episode = '/api/episode/' + episode;
				}

				const request = new XMLHttpRequest();
				request.open('GET', episode, true);
				request.onload = function() {
					if (request.status >= 200 && request.status < 400) {
						// Store the episode data
						self.episodeData = JSON.parse(request.responseText);

						// Show the episode mask image, otherwise reset the header back its default state
						if (self.episodeData.mask !== null) {
							self.globalMenu.style.backgroundImage = 'url(' + self.episodeData.mask + ')';
							self.globalMenu.style.backgroundColor = 'transparent';
						}
						else {
							self.globalMenu.style.backgroundImage = null;
							self.globalMenu.style.backgroundColor = '#FFFFFF';
						}

						// Start loadng the episode audio if using the toggle button
						if (autoplay === true) {
							setTimeout(function() {
								self.$refs.audioElement.load();
							}, 0);
						}
						else {
							self.isLoading = false;
						}
					}
				};
				request.send();
			},
			loaded: function() {
				if (this.isReady === false) {
					// Start playing the audio once its ready to be played
					this.isReady = true;
					this.isLoading = false;
					this.togglePlay(true, null);
				}
			},
			togglePlay: function(target, event) {
				const self = this;

				if (event !== null) {
					event.preventDefault();
				}

				// Do not do anything if the player is still in a loading state
				if (this.isLoading === false) {
					if (this.isReady === false) {
						// If the audio element is not ready yet, start loading it
						this.isLoading = true;
						this.$refs.audioElement.load();
					}
					else {
						// Otherwise call the pause/play methods
						if (target === false) {
							this.$refs.audioElement.pause();
							this.isPlaying = false;
						}
						else if (target === true) {
							// Attempt autoplay for Safari 11
							// More info: https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/
							let promiseError = false;
							const promise = this.$refs.audioElement.play();
							promise.catch(function(error) {
								promiseError = true;
								self.isPlaying = false;
							}).then(function() {
								if (!promiseError) {
									self.isPlaying = true;
								}
							});
						}
					}
				}
			},
			stop: function() {
				// Call the pause method on the audio element
				this.$refs.audioElement.pause();
				this.isPlaying = false;
			},
			moveLine: function(event) {
				// Move the seek line depending on the window y-coordinate during hover event
				this.lineHover = ((event.pageX - 2) / window.innerWidth) * 100;
				this.hoverTime = this.episodeData.duration * (event.pageX / window.innerWidth);
			},
			changeTime: function(event) {
				// Change audio element time by calculating the target time by y-coordinate and total duration
				if (this.isReady === true) {
					const coordinateX = event.pageX / window.innerWidth;
					this.$refs.audioElement.currentTime = this.episodeData.duration * coordinateX;
					this.updateTime();
				}
			},
			updateTime: function() {
				// Hide buffering state
				this.isBuffering = false;

				// Update the timestamps
				if (this.isReady === true) {
					this.currentTime = this.$refs.audioElement.currentTime;
				}
				else {
					return null;
				}
			},
			formatTime: function(target) {
				// Returns a HH:MM:SS formatted time string
				target = Number(target);
				const hours = Math.floor(target / 3600);
				const minutes = Math.floor(target % 3600 / 60);
				const seconds = Math.floor(target % 3600 % 60);
				return (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
			},
			toggleMute: function(event) {
				event.preventDefault();

				// Toggle between mute (0) and normal volume (100)
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
				// Returns timestamp for current time or hover-position time
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
				// Returns timestamp for total duration
				return this.formatTime(this.episodeData.duration);
			},
			linePosition: function() {
				// Returns CSS left-position for seek line hover position
				if (this.isReady === true && this.movingLine === true) {
					return this.lineHover + '%';
				}
				else {
					return false;
				}
			},
			progressWidth: function() {
				// Returns CSS position for progress cover element
				let targetWidth;
				if (this.isReady === true) {
					targetWidth = (this.currentTime / this.episodeData.duration) * 100;
				}
				else {
					targetWidth = 0;
				}
				return targetWidth + '%';
			},
			isMuted: function() {
				// Returns boolean if audio is currently muted (0)
				return parseInt(this.volume, 10) === 0;
			},
			playerBackground: function() {
				// Returns CSS background-image
				if (this.episodeData !== false && this.episodeData.background !== null) {
					return 'url(' + this.episodeData.background + ')';
				}
				else {
					return null;
				}
			},
			playerColour: function() {
				// Returns CSS background-color
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
				// Update the document title if audio is playing
				if (value === true) {
					document.title = 'Playing ' + this.episodeData.title;
				}
				else {
					document.title = this.pageTitle;
				}
			},
			volume: function(value) {
				// Convert the volume percentage into a valid input-slider value
				if (this.isReady === true) {
					this.$refs.audioElement.volume = parseInt(value, 10) * 0.01;
				}
			}
		},
		mounted: function() {
			const self = this;

			// Once mounted, get the latest episode
			this.getEpisode('latest', false);

			const loadEpisode = function(event) {
				event.preventDefault();
				self.getEpisode(this.getAttribute('data-id'), true);
				window.scrollTo(0, 0);
			};

			// Bind the archive play buttons
			const buttons = document.body.getElementsByClassName('js-play');
			for (let i = 0; i < buttons.length; i++) {
				buttons[i].addEventListener('click', loadEpisode);
			}

			// If resizing to mobile layout, stop streaming the audio element data
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
