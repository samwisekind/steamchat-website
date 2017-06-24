var $archives;

var episodeCache = {
	years: {},
	categories: {}
};

function createCache() {

	$archives.$sidebar.$years = $archives.$sidebar.find('.js-year');
	$archives.$sidebar.$categories =$archives.$sidebar.find('.js-category');

	var i, targetElement;

	// Cache episodes by year
	for (i = 0; i < $archives.$sidebar.$years.length; i++) {

		// Get the element
		targetElement = $archives.$sidebar.$years.eq(i);

		// Get the year value
		var targetYear = targetElement.val();

		// Check if the object property already exists
		if (episodeCache.years.hasOwnProperty(targetYear) === false) {
			episodeCache.years[targetYear] = $archives.$episodes.filter('[data-year="' + targetYear + '"]');
		}

	}

	// Cache episodes by categoryx
	for (i = 0; i < $archives.$sidebar.$categories.length; i++) {

		// Get the element
		targetElement = $archives.$sidebar.$categories.eq(i);

		// Get the category value
		var targetCategory = targetElement.val();

		// Check if the object property already exists
		if (targetCategory !== 'all' && episodeCache.categories.hasOwnProperty(targetCategory) === false) {
			episodeCache.categories[targetCategory] = $archives.$episodes.filter('[data-category="' + targetCategory + '"]');
		}

	}

}

function searchBehaviour() {

	var value = this.value;
	var regex = new RegExp(value, 'gi');

	for (var i = 0; i < $archives.$episodes.length; i++) {
		var targetElement = $archives.$episodes.eq(i);
		if (targetElement.attr('data-description').search(regex) < 0) {
			targetElement.addClass('filter-description');
		}
		else {
			targetElement.removeClass('filter-description');
		}
	}

	if (value !== '') {
		$archives.$sidebar.$search.addClass('active');
	}
	else {
		$archives.$sidebar.$search.removeClass('active');
	}

	updateFilteringDisplay();

}

function yearsBehaviour() {

	var totalLength = $archives.$sidebar.$years.length;
	var yearsActive = totalLength - (totalLength - $archives.$sidebar.$years.filter(':checked').length);

	// If this is the last checkbox checked, prevent it from becoming unchecked
	if (this.checked === false && yearsActive < 1) {
		this.checked = true;
	}
	else {

		this.disabled = false;
		var selectedYear = episodeCache.years[this.value];

		if (this.checked === true) {
			selectedYear.removeClass('filter-year');
			$archives.$sidebar.$years.attr('disabled', false);
		}
		else {
			selectedYear.addClass('filter-year');
		}

		if (yearsActive <= 1) {
			$archives.$sidebar.$years.filter(':checked').attr('disabled', true);
		}

	}

	updateFilteringDisplay();

}

function categoryBehaviour() {

	var selectedCategory = $archives.$sidebar.$categories.filter(':checked').val();

	if (selectedCategory === 'all') {
		$archives.$episodes.removeClass('filter-category');
	}
	else {
		$archives.$episodes.addClass('filter-category');
		episodeCache.categories[selectedCategory].removeClass('filter-category');
	}

	updateFilteringDisplay();

}

function resetBehaviour(event) {

	event.preventDefault();

	var i;

	// Reset the search field
	$archives.$sidebar.$search.val('').removeClass('active');

	// Reset the year inputs
	for (i = 0; i < $archives.$sidebar.$years.length; i++) {
		var targetCheckbox = $archives.$sidebar.$years.eq(i);
		targetCheckbox.prop('checked', true).prop('disabled', false);
	}

	// Reset the category inputs
	for (i = 0; i < $archives.$sidebar.$categories.length; i++) {
		var targetCategory = $archives.$sidebar.$categories.eq(i);
		if (targetCategory.val() === 'all') {
			targetCategory.prop('checked', true);
			break;
		}
	}

	// Reset the episode elements
	$archives.$episodes.removeClass('filter-description filter-year filter-category');

	// Update filering display
	updateFilteringDisplay();

}

function updateFilteringDisplay() {

	var total = $archives.$episodes.length;
	var showing = total - $archives.$episodes.filter('.filter-description, .filter-year, .filter-category').length;

	if (showing < total) {
		$archives.$sidebar.$counter.html('Showing ' + showing + ' of ' + total + ' episodes');
		$archives.$sidebar.addClass('active');
	}
	else {
		$archives.$sidebar.removeClass('active');
	}

	if (showing === 0) {
		$archives.addClass('empty');
	}
	else {
		$archives.removeClass('empty');
	}

}

export function init(element) {

	// jQuery binds
	$archives = element;
		$archives.$sidebar = $archives.find('.js-sidebar');
			$archives.$sidebar.$search = $archives.$sidebar.find('.js-search');
			$archives.$sidebar.$years = $archives.$sidebar.find('.js-year');
			$archives.$sidebar.$categories = $archives.$sidebar.find('.js-category');
			$archives.$sidebar.$counter = $archives.$sidebar.find('.js-count');
		$archives.$episodes = $archives.find('.js-episode');

	/*** Bind sidebar scrolling ***/
	$(window).scroll(function() {
		var padding = 40;
		if (window.scrollY > ($archives.offset().top - padding)) {
			$archives.$sidebar.addClass('sticky');
		}
		else {
			$archives.$sidebar.removeClass('sticky');
		}
	}).scroll();

	/*** Caching episodes and inputs by years and categories ***/
	createCache();

	/*** Bind Search ***/
	$archives.$sidebar.$search.on('input', searchBehaviour);

	/*** Bind Year Inputs ***/
	$archives.$sidebar.$years.on('change', yearsBehaviour);

	/*** Bind Category Inputs ***/
	$archives.$sidebar.$categories.on('change', categoryBehaviour);

	/*** Bind Reset Button ***/
	$archives.find('.js-reset').on('click', resetBehaviour);

}
