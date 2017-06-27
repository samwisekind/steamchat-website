<?php

use App\Episode;

// Return JSON for latest episode
Route::get('/api/latest', function () {

	return Episode::where('type', 'episode')
		->orderBy('release_date', 'desc')
		->first();

});

// Return JSON for episode data by episode ID
Route::get('/api/episode/{id}', function ($id) {

	return Episode::where('id', $id)
		->first();

});

Route::get('/', function () {

	$episodes = Episode::orderBy('release_date', 'desc')
		->get();

	$years = Episode::select(DB::raw('DISTINCT YEAR(release_date)'))
		->orderBy('release_date', 'desc')
		->get();

	$latest = $episodes->where('type', 'episode')
		->first();

    return view('layouts.home', [
		'episodes' => $episodes,
		'latest' => $latest,
		'years' => $years
	]);

})->name('home');

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

	$episode = Episode::where('type', $type)
		->where('number', $number)
		->first();

	if ($episode === null) {
		return redirect()->route('home');
	}

    return view('layouts.episode', [
		'episode' => $episode,
	]);

})->name('episode');

Route::get('/about', function () {

    return view('layouts.about');

})->name('about');

Route::get('/specials', function () {

    return view('layouts.specials');

})->name('specials');
