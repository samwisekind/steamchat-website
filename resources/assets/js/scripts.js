var $ = require('jquery');

(function(){

	function bindSidebar() {

		var i, targetElement, targetYear, targetCategory;

		/*** Bind Sidebar ***/

		var sidebar = $archives.find('.js-sidebar');

		$(window).scroll(function() {
			var padding = 40;
			if (window.scrollY > ($archives.offset().top - padding)) {
				sidebar.addClass('sticky');
			}
			else {
				sidebar.removeClass('sticky');
			}
		}).scroll();

		/*** Bind Search ***/

		var searchField = sidebar.find('.js-search');

		searchField.on('input', function() {

			var value = this.value;
			var regex = new RegExp(value, 'gi');

			for (i = 0; i < $archives.$episodes.length; i++) {
				targetElement = $archives.$episodes.eq(i);
				if (targetElement.attr('data-description').search(regex) < 0) {
					targetElement.addClass('filter-description');
				}
				else {
					targetElement.removeClass('filter-description');
				}
			}

			if (value !== '') {
				searchField.addClass('active');
			}
			else {
				searchField.removeClass('active');
			}

			updateFilteringDisplay();

		});

		/*** Caching episodes and inputs by years and categories ***/

		var episodeCache = {
			inputs: {
				years: sidebar.find('.js-year'),
				categories: sidebar.find('.js-category')
			},
			episodes: {
				years: {},
				categories: {}
			}
		};

		// Cache episodes by year
		for (i = 0; i < episodeCache.inputs.years.length; i++) {

			// Get the element
			targetElement = episodeCache.inputs.years.eq(i);

			// Get the year value
			targetYear = targetElement.val();

			// Check if the object property already exists
			if (episodeCache.episodes.years.hasOwnProperty(targetYear) === false) {
				episodeCache.episodes.years[targetYear] = $archives.$episodes.filter('[data-year="' + targetYear + '"]');
			}

		}

		// Cache episodes by categoryx
		for(i = 0; i < episodeCache.inputs.categories.length; i++) {

			// Get the element
			targetElement = episodeCache.inputs.categories.eq(i);

			// Get the category value
			targetCategory = targetElement.val();

			// Check if the object property already exists
			if (targetCategory !== 'all' && episodeCache.episodes.categories.hasOwnProperty(targetCategory) === false) {
				episodeCache.episodes.categories[targetCategory] = $archives.$episodes.filter('[data-category="' + targetCategory + '"]');
			}

		}

		/*** Bind Year Inputs ***/

		var yearsTotal, yearsActive = episodeCache.inputs.years.length;

		episodeCache.inputs.years.on('change', function() {

			// If this is the last checkbox checked, prevent it from becoming unchecked
			if (this.checked === false && yearsActive <= 1) {
				this.checked = true;
			}
			else {

				this.disabled = false;
				var selectedYear = episodeCache.episodes.years[this.value];

				if (this.checked === true) {
					yearsActive++;
					selectedYear.removeClass('filter-year');
					episodeCache.inputs.years.attr('disabled', false);
				}
				else {
					yearsActive--;
					selectedYear.addClass('filter-year');
				}

				if (yearsActive <= 1) {
					episodeCache.inputs.years.filter(':checked').attr('disabled', true);
				}

			}

			updateFilteringDisplay();

		});

		/*** Bind Category Inputs ***/

		episodeCache.inputs.categories.on('change', function() {

			var selectedCategory = episodeCache.inputs.categories.filter(':checked').val();

			if (selectedCategory === 'all') {
				$archives.$episodes.removeClass('filter-category');
			}
			else {
				$archives.$episodes.addClass('filter-category');
				episodeCache.episodes.categories[selectedCategory].removeClass('filter-category');
			}

			updateFilteringDisplay();

		});

		/*** Episode Count ***/

		var counter = {
			element: sidebar.find('.js-count'),
			total: $archives.$episodes.length,
			showing: $archives.$episodes.length
		};

		function updateFilteringDisplay() {

			counter.showing = counter.total - $archives.$episodes.filter('.filter-description, .filter-year, .filter-category').length;

			if (counter.showing < counter.total) {
				counter.element.html('Showing ' + counter.showing + ' of ' + counter.total + ' episodes');
				sidebar.addClass('active');
			}
			else {
				sidebar.removeClass('active');
			}

			if (counter.showing === 0) {
				$archives.addClass('empty');
			}
			else {
				$archives.removeClass('empty');
			}

		}

		/*** Bind Reset Button ***/

		$archives.find('.js-reset').on('click', function(event) {

			event.preventDefault();

			// Reset the search field
			searchField.val('').removeClass('active');

			// Reset the year inputs
			for (i = 0; i < episodeCache.inputs.years.length; i++) {
				targetCheckbox = episodeCache.inputs.years.eq(i);
				targetCheckbox.prop('checked', true).prop('disabled', false);
			}

			yearsActive = yearsTotal;

			// Reset the category inputs
			for (i = 0; i < episodeCache.inputs.categories.length; i++) {
				targetCategory = episodeCache.inputs.categories.eq(i);
				if (targetCategory.val() === 'all') {
					targetCategory.prop('checked', true);
					break;
				}
			}

			// Reset the episode elements
			$archives.$episodes.removeClass('filter-description filter-year filter-category');

			// Update filering display
			updateFilteringDisplay();

		});

	}

	var $archives = $('.js-archives');

	if ($archives.length > 0) {
		$archives.$episodes = $archives.find('.js-episode');
		bindSidebar();
	}

	var $listen = $('.js-listen');

	if ($listen.length > 0) {

		$listen.on('click', function(event) {

			event.preventDefault();

			var target = document.getElementsByClassName('js-player')[0];

			if (target.paused === true || target.stopped === true) {
				target.play();
			}
			else {
				target.pause();
			}

		});

	}

})();
