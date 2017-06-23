<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{
	public function episodeTitle() {
		$type = $this->type;
		$number = $this->number;
		$title = $this->title;
		if ($type === 'episode') {
			$prepend = 'Episode';
		}
		else if ($type === 'snack') {
			$prepend = 'Snack';
		}
		return $prepend . ' #' . $number . ': ' . $title;
	}
	public function previousEpisode() {
		$type = $this->type;
		$number = $this->number - 1;
		$previousEpisode = static::where('type', $type)
			->where('number', $number)
			->first();
		if (isset($previousEpisode) === true) {
			return $previousEpisode;
		}
		else {
			return false;
		}
	}
	public function nextEpisode() {
		$type = $this->type;
		$number = $this->number + 1;
		$nextEpisode = static::where('type', $type)
			->where('number', $number)
			->first();
		if (isset($nextEpisode) === true) {
			return $nextEpisode;
		}
		else {
			return false;
		}
	}
}
