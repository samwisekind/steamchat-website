<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{

	public function getTitle($short) {
		$type = $this->type;
		$number = $this->number;
		$title = $this->title;
		if ($short === true) {
			$prepend = '';
		}
		else if ($type === 'episode') {
			$prepend = 'Episode ';
		}
		else if ($type === 'snack') {
			$prepend = 'Snack ';
		}
		return $prepend . '#' . $number . ': ' . $title;
	}

	public function getURL() {
		return route('episode', [
			'type' => $this->type,
			'number' => $this->number
		]);
	}

	public function getPreviousEpisode() {
		$type = $this->type;
		$number = $this->number - 1;
		$previousEpisode = static::where('type', $type)
			->where('number', $number)
			->first();
		return $previousEpisode;
	}

	public function getNextEpisode() {
		$type = $this->type;
		$number = $this->number + 1;
		$nextEpisode = static::where('type', $type)
			->where('number', $number)
			->first();
		return $nextEpisode;
	}

}
