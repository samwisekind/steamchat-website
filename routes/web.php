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
		->orderBy('release_date', 'desc')
		->get();

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
	$episode = Episode::where('type', $type)
		->where('number', $number)
		->where('active', true)
		->first();

	// Redirect to index if episode does not exist in the database
	if ($episode === null) {
		return redirect()->route('index');
	}

	return view('layouts.episode', [
		'episode' => $episode,
	]);

})->name('episode');

// Specials page route
Route::get('/specials', function () {

	return view('layouts.specials');

})->name('specials');

// About page route
Route::get('/about', function () {

	return view('layouts.about');

})->name('about');

// RSS feed XML
Route::get('/steamchat_feed_mp3.xml', function(){

	$episodes = Episode::orderBy('release_date', 'desc')
		->where('active', true)
		->get();

	PodcastFeed::setHeader([
		'link' => route('index'),
		'image' => asset('images/global/og_image.png')
	]);

	foreach($episodes as $episode) {
		PodcastFeed::addMedia([
			'title' => $episode->title,
			'description' => $episode->description,
			'publish_at' => $episode->release_date,
			'guid' => $episode->file_url,
			'url' => $episode->file_url,
			'type' => 'audio/mpeg',
			'duration' => $episode->file_duration
		]);
	}

	return Response::make(PodcastFeed::toString())
        ->header('Content-Type', 'text/xml');

});
