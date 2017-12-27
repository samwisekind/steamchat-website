<?php

use App\Episode;

// Return JSON data for latest episode
Route::get('/api/latest', function () {

	return Episode::where('active', true)
		->orderBy('release_date', 'desc')
		->first()
		->getJSONData();

});

// Return JSON data for episode data by episode ID
Route::get('/api/episode/{id}', function ($id) {

	return Episode::where('id', $id)
		->first()
		->getJSONData();

});

// Index route
Route::get('/', function () {

	// Get all episodes ordered by release date (and episode number for episodes released on the same date)
	$episodes = Episode::where('active', true)
		->orderBy('release_date', 'desc')
		->orderBy('number', 'desc')
		->get();

	// Get all unique release date years
	$years = Episode::where('active', true)
		->select(DB::raw('DISTINCT YEAR(release_date)'))
		->get()
		->toArray();

	// Sort array of years in descending order
	rsort($years);

	return view('layouts.index', [
		'episodes' => $episodes,
		'years' => $years
	]);

})->name('index');

// Permanent redirect for plural of 'episode'
Route::get('/episodes/{number}', function ($number) {

	return redirect()->route('episode', [
		'type' => 'episode',
		'number' => $number
	]);

});

// Permanent redirect for plural of 'snack'
Route::get('/snacks/{number}', function ($number) {

	return redirect()->route('episode', [
		'type' => 'snack',
		'number' => $number
	]);

});

Route::get('/{type}/{number}', function ($type, $number) {

	// Get episode by its type, number, and active state
	$episode = Episode::where('active', true)
		->where('type', $type)
		->where('number', $number)
		->first();

	// Redirect to index if episode does not exist in the database
	if ($episode === null) {
		return redirect()->route('index');
	}

	$first = Episode::where('active', true)
		->where('type', $type)
		->orderBy('release_date', 'asc')
		->first();

	$last = Episode::where('active', true)
		->where('type', $type)
		->orderBy('release_date', 'desc')
		->first();

	return view('layouts.episode', [
		'episode' => $episode,
		'first' => $first->getURL(),
		'last' => $last->getURL()
	]);

})->name('episode');

Route::get('/{type}/{number}/download', function ($type, $number) {

	// Get episode by its type, number, and active state
	$episode = Episode::where('active', true)
		->where('type', $type)
		->where('number', $number)
		->first();

	$path = $episode->file_url;
	header('Content-Type: application/octet-stream');
	header('Content-Transfer-Encoding: Binary');
	header('Content-disposition: attachment; filename=\'' . basename($path) . '\'');

	return readfile($path);

})->name('episode-download');

// Specials page route
Route::get('/specials', function () {

	return view('layouts.specials');

})->name('specials');

// About page route
Route::get('/about', function () {

	return view('layouts.about');

})->name('about');

// RSS feed XML (MP3)
Route::get('/steamchat_feed.xml', function () {

	$episodes = Episode::orderBy('release_date', 'desc')
		->where('active', true)
		->get();

	$content = view('misc.podcast-feed', [
		'episodes' => $episodes
	]);

	return response($content)->withHeaders([
		'Content-Type' => 'text/xml'
	]);

})->name('feed');

// RSS feed XML (MP3) redirect
Route::get('/steamchat_feed_mp3.xml', function () {

	return redirect()->route('feed');

})->name('feed-mp3');

// RSS feed XML (M4A) redirect
Route::get('/steamchat_feed_m4a.xml', function () {

	return redirect()->route('feed');

})->name('feed-m4a');