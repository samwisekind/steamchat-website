<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Episode extends Model
{

	// Returns formatted episode title prepended with episode type and number text
	// Function parameter will return episode title without the "Episode" text if passed-in as true and episode type is 'episode'
	public function getTitle($short) {

		$type = $this->type;
		$number = $this->number;
		$title = $this->title;

		if ($type === 'episode') {
			$prepend = '#' . $number;
			if ($short === false) {
				$prepend = 'Episode ' . $prepend;
			}
		}
		else if ($type === 'snack') {
			$prepend = 'Snack';
		}

		return $prepend . ': ' . $title;

	}

	// Return absolute URL to episode page
	public function getURL() {

		return route('episode', [
			'type' => $this->type,
			'number' => $this->number
		]);

	}

	// Returns the episode duration in seconds
	public function getDurationSeconds() {

		$duration = $this->file_duration;
		sscanf($duration, '%d:%d:%d', $hours, $minutes, $seconds);
		$duration = ($hours * 3600) + ($minutes * 60);
		if ($seconds !== null) {
			$duration += $seconds;
		}

		return $duration;

	}

	// Returns previous episode (if it exists) by previous ID
	public function getPreviousEpisode() {

		$type = $this->type;
		$number = $this->number - 1;
		$previousEpisode = static::where('active', true)
			->where('type', $type)
			->where('number', $number)
			->first();

		return $previousEpisode;

	}

	// Returns next episode (if it exists) by next ID
	public function getNextEpisode() {

		$type = $this->type;
		$number = $this->number + 1;
		$nextEpisode = static::where('active', true)
			->where('type', $type)
			->where('number', $number)
			->first();

		return $nextEpisode;

	}

	// Return specific episode data in JSON format
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
