var $archives;

var episodeCache = {
	years: {},
	categories: {}
};

function createCache() {

	$archives.$sidebar.$years = $archives.$sidebar.getElementsByClassName('js-year');
	$archives.$sidebar.$categories = $archives.$sidebar.getElementsByClassName('js-category');

	var i, targetElement;

	var filterArray = function(key, attribute) {
		return Array.prototype.filter.call($archives.$episodes, function(episode) {
			return episode.getAttribute(attribute) === key;
		});
	};

	// Cache episodes by year
	for (i = 0; i < $archives.$sidebar.$years.length; i++) {

		// Get the element
		targetElement = $archives.$sidebar.$years[i];

		// Get the year value
		var targetYear = targetElement.value;

		// Check if the object property already exists
		if (episodeCache.years.hasOwnProperty(targetYear) === false) {
			episodeCache.years[targetYear] = filterArray(targetYear, 'data-year');
		}

	}

	// Cache episodes by category
	for (i = 0; i < $archives.$sidebar.$categories.length; i++) {

		// Get the element
		targetElement = $archives.$sidebar.$categories[i];

		// Get the category value
		var targetCategory = targetElement.value;

		// Check if the object property already exists
		if (targetCategory !== 'all' && episodeCache.categories.hasOwnProperty(targetCategory) === false) {
			episodeCache.categories[targetCategory] = filterArray(targetCategory, 'data-category');
		}

	}

}

function searchBehaviour() {

	var value = this.value;
	var regex = new RegExp(value, 'gi');

	for (var i = 0; i < $archives.$episodes.length; i++) {
		var targetElement = $archives.$episodes[i];
		if (targetElement.getAttribute('data-description').search(regex) < 0) {
			targetElement.classList.add('filter-description');
		}
		else {
			targetElement.classList.remove('filter-description');
		}
	}

	if (value !== '') {
		$archives.$sidebar.$search.classList.remove('active');
	}
	else {
		$archives.$sidebar.$search.classList.remove('active');
	}

	updateFilteringDisplay();

}

function yearsBehaviour() {

	var i;

	var totalLength = $archives.$sidebar.$years.length;

	var yearsActive = 0;
	for (i = 0; i < $archives.$sidebar.$years.length; i++) {
		if ($archives.$sidebar.$years[i].checked === true) {
			yearsActive++;
		}
	}

	yearsActive = totalLength - (totalLength - yearsActive);

	// If this is the last checkbox checked, prevent it from becoming unchecked
	if (this.checked === false && yearsActive < 1) {
		this.checked = true;
	}
	else {

		this.disabled = false;
		var selectedYear = episodeCache.years[this.value];

		// Loop through the year of episodes corresponding to the year checkbox value
		for (i = 0; i < selectedYear.length; i++) {

			var targetEpisode = selectedYear[i];

			if (this.checked === true) {
				targetEpisode.classList.remove('filter-year');
			}
			else {
				targetEpisode.classList.add('filter-year');
			}

		}

		// Disable last checkbox if only one left, otherwise enable all checkboxes
		for (i = 0; i < $archives.$sidebar.$years.length; i++) {
			if (yearsActive <= 1 && $archives.$sidebar.$years[i].checked === true) {
				$archives.$sidebar.$years[i].disabled = true;
				break;
			}
			else {
				$archives.$sidebar.$years[i].disabled = false;
			}
		}

	}

	updateFilteringDisplay();

}

function categoryBehaviour() {

	var i;
	var selectedCategory = this.value;

	if (selectedCategory === 'all') {
		for (i = 0; i < $archives.$episodes.length; i++) {
			$archives.$episodes[i].classList.remove('filter-category');
		}
	}
	else {

		for (i = 0; i < $archives.$episodes.length; i++) {
			$archives.$episodes[i].classList.add('filter-category');
		}

		var targetCategory = episodeCache.categories[selectedCategory];
		for (i = 0; i < targetCategory.length; i++) {
			targetCategory[i].classList.remove('filter-category');
		}

	}

	updateFilteringDisplay();

}

function resetBehaviour(event) {

	event.preventDefault();

	var i;

	// Reset the search field
	$archives.$sidebar.$search.value = '';
	$archives.$sidebar.$search.classList.remove('active');

	// Reset the year inputs
	for (i = 0; i < $archives.$sidebar.$years.length; i++) {
		var targetCheckbox = $archives.$sidebar.$years[i];
		targetCheckbox.checked = true;
		targetCheckbox.disabled = false;
	}

	// Reset the category inputs
	for (i = 0; i < $archives.$sidebar.$categories.length; i++) {
		var targetCategory = $archives.$sidebar.$categories[i];
		if (targetCategory.value === 'all') {
			targetCategory.checked = true;
			break;
		}
	}

	// Reset the episode elements
	for (i = 0; i < $archives.$episodes.length; i++) {
		$archives.$episodes[i].classList.remove('filter-description', 'filter-year', 'filter-category');
	}

	// Update filering display
	updateFilteringDisplay();

}

function updateFilteringDisplay() {

	var total = $archives.$episodes.length;
	var hiding = 0;

	var filterClasses = [
		'filter-description',
		'filter-year',
		'filter-category'
	];

	// Function to check if any of the filter classes are present in the element class list
	var checkClass = function(element) {
		var containCount = 0;
		for (var i = 0; i < filterClasses.length; i++) {
			if (element.classList.contains(filterClasses[i]) === true) {
				return true;
			}
		}
		return false;
	};

	// Loop through each episode elements and increase the hiding count if it contains any filter classes
	for (var i = 0; i < $archives.$episodes.length; i++) {
		if (checkClass($archives.$episodes[i]) === true) {
			hiding++;
		}
	}

	var showing = total - hiding;

	if (showing < total) {
		$archives.$sidebar.$counter.innerHTML = 'Showing ' + showing + ' of ' + total + ' episodes';
		$archives.$sidebar.classList.add('active');
	}
	else {
		$archives.$sidebar.classList.remove('active');
	}

	if (showing === 0) {
		$archives.classList.add('empty');
	}
	else {
		$archives.classList.remove('empty');
	}

}

export function init(element) {

	var i;

	// jQuery binds
	$archives = element;
		$archives.$sidebar = $archives.getElementsByClassName('js-sidebar')[0];
			$archives.$sidebar.$search = $archives.$sidebar.getElementsByClassName('js-search')[0];
			$archives.$sidebar.$years = $archives.$sidebar.getElementsByClassName('js-year');
			$archives.$sidebar.$categories = $archives.$sidebar.getElementsByClassName('js-category');
			$archives.$sidebar.$counter = $archives.$sidebar.getElementsByClassName('js-count')[0];
		$archives.$episodes = $archives.getElementsByClassName('js-episode');

	/*** Bind sidebar scrolling ***/
	window.addEventListener('scroll', function() {
		var padding = 40;
		if (window.scrollY > ($archives.offsetTop - padding)) {
			$archives.$sidebar.classList.add('sticky');
		}
		else {
			$archives.$sidebar.classList.remove('sticky');
		}
	});

	/*** Caching episodes and inputs by years and categories ***/
	createCache();

	/*** Bind Search ***/
	$archives.$sidebar.$search.addEventListener('input', searchBehaviour);

	/*** Bind Year Inputs ***/
	for (i = 0; i < $archives.$sidebar.$years.length; i++) {
		$archives.$sidebar.$years[i].addEventListener('change', yearsBehaviour);
	}

	/*** Bind Category Inputs ***/
	for (i = 0; i < $archives.$sidebar.$categories.length; i++) {
		$archives.$sidebar.$categories[i].addEventListener('change', categoryBehaviour);
	}

	/*** Bind Reset Button ***/
	var reset = $archives.getElementsByClassName('js-reset');
	for (i = 0; i < reset.length; i++) {
		reset[i].addEventListener('click', resetBehaviour);
	}

}
