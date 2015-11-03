# Steamchat Website Source Files

Here you can find the source files for the Steamchat (formerly "Steamcast") website. We're releasing the entirety of the website so if you're interested in web development and design you can download the source files to learn, play or modify with. Do anything you wish with them, no attribution required!

This is the version of the website hosted from 2013 onwards and is *not* the [current archive website](http://thesteamchat.com/). We do not intend on uploading the versions from 2009-2012 as we no longer have access to the source files.

We have updated the site from its [original state](https://github.com/Flamov/steamchat-website/commit/c6ec7d23f21fbf421eb74abe7b1a97b9d83ec0c9) to be more sanely coded as well as clean up the original source files, add CSS3 support, amongst other things. We won't be updating any issues/bugs or following-up on pull requests at this time.

#### Requirements

If you plan on hosting the website in a local environment or otherwise, the following is required:

* PHP5.4 or greater
* Access to `.htaccess` for Apache or equivalent directory-level configuration file

#### Things To Note

* `.htaccess` (or equivalent) is required for episode pages to work. The intended behaviour is having the server parse requests to episode pages (e.g. `/episodes/50/`) to use `lib/episodePage.php` and pass in the episode number from the end of the requested URL (in this case, 50).
  * In addition, make sure you also configure your server to support the SVG MIME type [more info here](http://www.kaioa.com/node/45)
* The latest episode to be shown on the homepage is controlled by the PHP variable `$latestEpisode` (integer) in [`index.php`](https://github.com/Flamov/steamchat-website/blob/master/index.php#L3).
* Episode data is controlled in the [`lib/episodeData.php`](https://github.com/Flamov/steamchat-website/blob/master/lib/episodeData.php) file. Information on how the arrays are structured can be found in [the comment at the start of the file](https://github.com/Flamov/steamchat-website/blob/master/lib/episodeData.php#L3-L17).
  * If you plan on further developing with the source files, we *highly* recommend you use a database to retrieve relevant episode data instead of referring to a single PHP file with a single array. We provided the `episodeData.php` file purely for reference; it's a ~50Kb file that gets requested every time you visit a page on the website and isn't recommended as it could lead to performance issues.
* Episode MP3 files are not included in this repository.
