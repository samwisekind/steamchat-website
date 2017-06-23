<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Episode;

Route::get('/', function () {

	$episodes = Episode::orderBy('release_date', 'desc')->get();

	$years = Episode::select(DB::raw('DISTINCT YEAR(release_date)'))
		->orderBy('release_date', 'desc')
		->get();

    return view('layouts.home', [
		'section' => 'home',
		'episodes' => $episodes,
		'years' => $years
	]);

});
