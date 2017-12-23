let $archives;
const episodeCache = {
	years: {},
	categories: {}
};

function createCache() {
	$archives.$sidebar.$years = $archives.$sidebar.getElementsByClassName('js-year');
	$archives.$sidebar.$categories = $archives.$sidebar.getElementsByClassName('js-category');

	const filterArray = function(key, attribute) {
		return Array.prototype.filter.call($archives.$episodes, function(episode) {
			return episode.getAttribute(attribute) === key;
		});
	};

	// Cache episodes by year
	for (let i = 0; i < $archives.$sidebar.$years.length; i++) {
		// Get the element
		let targetElement = $archives.$sidebar.$years[i];

		// Get the year value
		const targetYear = targetElement.value;

		// Check if the object property already exists
		if (episodeCache.years.hasOwnProperty(targetYear) === false) {
			episodeCache.years[targetYear] = filterArray(targetYear, 'data-year');
		}
	}

	// Cache episodes by category
	for (let i = 0; i < $archives.$sidebar.$categories.length; i++) {
		// Get the element
		let targetElement = $archives.$sidebar.$categories[i];

		// Get the category value
		const targetCategory = targetElement.value;

		// Check if the object property already exists
		if (targetCategory !== 'all' && episodeCache.categories.hasOwnProperty(targetCategory) === false) {
			episodeCache.categories[targetCategory] = filterArray(targetCategory, 'data-category');
		}
	}

}

function searchBehaviour() {
	let value = this.value;

	// Ignore non-alphanumeric and whitespace characters
	value = value.replace(/[^a-zA-Z0-9\s]/gi, '');

	const regex = new RegExp(value, 'gi');

	for (let i = 0; i < $archives.$episodes.length; i++) {
		const targetElement = $archives.$episodes[i];
		let description = targetElement.getAttribute('data-description');
		if (description.search(regex) < 0) {
			targetElement.classList.add('filter-description');
		}
		else {
			targetElement.classList.remove('filter-description');
		}
	}

	if (value !== '') {
		$archives.$sidebar.$search.classList.add('active');
	}
	else {
		$archives.$sidebar.$search.classList.remove('active');
	}

	updateFilteringDisplay();
}

function yearsBehaviour() {
	const totalLength = $archives.$sidebar.$years.length;
	let yearsActive = 0;
	for (let i = 0; i < $archives.$sidebar.$years.length; i++) {
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
		const selectedYear = episodeCache.years[this.value];

		// Loop through the year of episodes corresponding to the year checkbox value
		for (let i = 0; i < selectedYear.length; i++) {
			const targetEpisode = selectedYear[i];
			if (this.checked === true) {
				targetEpisode.classList.remove('filter-year');
			}
			else {
				targetEpisode.classList.add('filter-year');
			}
		}

		// Disable last checkbox if only one left, otherwise enable all checkboxes
		for (let i = 0; i < $archives.$sidebar.$years.length; i++) {
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
	const selectedCategory = this.value;

	if (selectedCategory === 'all') {
		for (let i = 0; i < $archives.$episodes.length; i++) {
			$archives.$episodes[i].classList.remove('filter-category');
		}
	}
	else {
		for (let i = 0; i < $archives.$episodes.length; i++) {
			$archives.$episodes[i].classList.add('filter-category');
		}

		const targetCategory = episodeCache.categories[selectedCategory];
		for (let i = 0; i < targetCategory.length; i++) {
			targetCategory[i].classList.remove('filter-category');
		}
	}

	updateFilteringDisplay();
}

function resetBehaviour(event) {
	if (event !== null) {
		event.preventDefault();
	}

	// Reset the search field
	$archives.$sidebar.$search.value = '';
	$archives.$sidebar.$search.classList.remove('active');

	// Reset the year inputs
	for (let i = 0; i < $archives.$sidebar.$years.length; i++) {
		const targetCheckbox = $archives.$sidebar.$years[i];
		targetCheckbox.checked = true;
		targetCheckbox.disabled = false;
	}

	// Reset the category inputs
	for (let i = 0; i < $archives.$sidebar.$categories.length; i++) {
		const targetCategory = $archives.$sidebar.$categories[i];
		if (targetCategory.value === 'all') {
			targetCategory.checked = true;
			break;
		}
	}

	// Reset the episode elements
	for (let i = 0; i < $archives.$episodes.length; i++) {
		$archives.$episodes[i].classList.remove('filter-description', 'filter-year', 'filter-category');
	}

	// Update filering display
	updateFilteringDisplay();
}

function updateFilteringDisplay() {
	const total = $archives.$episodes.length;
	let hiding = 0;

	const filterClasses = [
		'filter-description',
		'filter-year',
		'filter-category'
	];

	// Function to check if any of the filter classes are present in the element class list
	const checkClass = function(element) {
		for (let i = 0; i < filterClasses.length; i++) {
			if (element.classList.contains(filterClasses[i]) === true) {
				return true;
			}
		}
		return false;
	};

	// Loop through each episode elements and increase the hiding count if it contains any filter classes
	for (let i = 0; i < $archives.$episodes.length; i++) {
		if (checkClass($archives.$episodes[i]) === true) {
			hiding++;
		}
	}

	const showing = total - hiding;
	if (showing < total) {
		$archives.$counter.innerHTML = 'Showing ' + showing + ' of ' + total + ' episodes:';
		$archives.classList.add('filtering');
		$archives.$sidebar.classList.add('active');
	}
	else {
		$archives.classList.remove('filtering');
	}

	if (showing === 0) {
		$archives.classList.add('empty');
	}
	else {
		$archives.classList.remove('empty');
	}
}

export function init(element) {
	// Cache element selectors
	$archives = element;
		$archives.$sidebar = $archives.getElementsByClassName('js-sidebar')[0];
			$archives.$sidebar.$search = $archives.$sidebar.getElementsByClassName('js-search')[0];
			$archives.$sidebar.$years = $archives.$sidebar.getElementsByClassName('js-year');
			$archives.$sidebar.$categories = $archives.$sidebar.getElementsByClassName('js-category');
		$archives.$episodes = $archives.getElementsByClassName('js-episode');
		$archives.$counter = $archives.getElementsByClassName('js-count')[0];

	/*** Bind sidebar scrolling ***/
	window.addEventListener('scroll', function() {
		const padding = 40;
		if (window.scrollY > ($archives.offsetTop - padding)) {
			$archives.$sidebar.classList.add('sticky');
		}
		else {
			$archives.$sidebar.classList.remove('sticky');
		}
	});

	/*** Caching episodes and inputs by years and categories ***/
	createCache();

	/*** Bind Show Button ***/
	const show = $archives.getElementsByClassName('js-show');
	if (show.length > 0) {
		show[0].addEventListener('click', function(event) {
			event.preventDefault();
			if ($archives.$sidebar.classList.contains('active') === true) {
				resetBehaviour(null);
			}
			$archives.$sidebar.classList.toggle('active');
		});
	}

	/*** Bind Search ***/
	$archives.$sidebar.$search.addEventListener('input', searchBehaviour);

	/*** Bind Year Inputs ***/
	for (let i = 0; i < $archives.$sidebar.$years.length; i++) {
		$archives.$sidebar.$years[i].addEventListener('change', yearsBehaviour);
	}

	/*** Bind Category Inputs ***/
	for (let i = 0; i < $archives.$sidebar.$categories.length; i++) {
		$archives.$sidebar.$categories[i].addEventListener('change', categoryBehaviour);
	}

	/*** Bind Reset Button ***/
	const reset = $archives.getElementsByClassName('js-reset');
	for (let i = 0; i < reset.length; i++) {
		reset[i].addEventListener('click', resetBehaviour);
	}
}
