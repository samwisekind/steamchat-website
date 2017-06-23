<?php

use App\Episode;

Route::get('/', function () {

	$episodes = Episode::orderBy('release_date', 'desc')
		->get();

	$years = Episode::select(DB::raw('DISTINCT YEAR(release_date)'))
		->orderBy('release_date', 'desc')
		->get();

    return view('layouts.home', [
		'episodes' => $episodes,
		'years' => $years
	]);

})->name('home');

Route::get('/{type}/{number}', function ($type, $number) {

	if ($type === 'episodes') {
		$type = 'episode';
	}

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
