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

	public function getDurationSeconds() {
		$duration = $this->file_duration;
		sscanf($duration, '%d:%d:%d', $hours, $minutes, $seconds);
		$duration = ($hours * 3600) + ($minutes * 60);
		if ($seconds !== null) {
			$duration += $seconds;
		}
		return $duration;
	}

	public function getPreviousEpisode() {
		$type = $this->type;
		$number = $this->number - 1;
		$previousEpisode = static::where('type', $type)
			->where('active', true)
			->where('number', $number)
			->first();
		return $previousEpisode;
	}

	public function getNextEpisode() {
		$type = $this->type;
		$number = $this->number + 1;
		$nextEpisode = static::where('type', $type)
			->where('active', true)
			->where('number', $number)
			->first();
		return $nextEpisode;
	}

	public function getJSONData() {

		return response()->json([
			'title' => static::getTitle(true),
			'release' => date_format(new \DateTime($this->release_date), 'd/m/Y'),
			'url' => static::getURL(),
			'file' => $this->file_url,
			'duration' => static::getDurationSeconds(),
			'mask' => $this->mask,
			'colour' => $this->colour,
			'background' => $this->background
		]);

	}

}
