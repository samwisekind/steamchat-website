# Steamchat Website Source Files

Here you can find the source files for the Steamchat (formerly "Steamcast") website. We're releasing the entirety of the website so if you're interested in web development and design you can download the source files to learn, play or modify with. Do anything you wish with them, no attribution required!

This is the version of the website hosted from 2013 onwards and is *not* the [current archive website](http://thesteamchat.com/). We do not intend on uploading the versions from 2009-2012 as we no longer have access to the source files.

We have updated the site from its [original state](https://github.com/Flamov/steamchat-website/commit/c6ec7d23f21fbf421eb74abe7b1a97b9d83ec0c9) to be more sanely coded as well as clean up the original source files, add CSS3 support, amongst other things. We won't be updating any issues/bugs or following-up on pull requests at this time.

### Requirements

If you plan on hosting the website in a local environment or otherwise, the following is required:

* PHP 5.4 or greater
* Access to `.htaccess` for Apache or equivalent directory-level configuration file

### Installation

1. Setup a web server that supports PHP 5.4 or greater and modification access to `.htaccess` or equivalent
2. Clone the repository or [download the ZIP](https://github.com/Flamov/steamchat-website/archive/master.zip) and place the files in the web server
3. Make sure `.htaccess` (or equivalent) is working as intended.
  * The intended behaviour is having the server parse requests to episode pages (e.g. `/episodes/50/`) to use `lib/episodePage.php` and pass in the episode type ("episodes" or "snack") and episode number from the end of the requested URL (in this case, "episodes" and 50).
3. In addition, also make sure you configure your server to support the SVG MIME type ([more info here](http://www.kaioa.com/node/45)).

For steps 3 and 4, the `.htaccess` file provided in the repository *should* work as intended. Unfortunately we are unable to provide support if this is not the case or for other web servers.

### Things To Note

* The latest episode to be shown on the homepage is controlled by the PHP variable `$latestEpisode` (integer) in [`index.php`](https://github.com/Flamov/steamchat-website/blob/master/index.php#L3).
* Episode data is controlled in the [`lib/episodeData.php`](https://github.com/Flamov/steamchat-website/blob/master/lib/episodeData.php) file. Information on how the arrays are structured can be found in [the comment at the start of the file](https://github.com/Flamov/steamchat-website/blob/master/lib/episodeData.php#L3-L17).
  * If you plan on further developing with the source files, we *highly* recommend you use a database to retrieve relevant episode data instead of referring to a single PHP file with a single array. We provided the `episodeData.php` file purely for reference; it's a ~50Kb file that gets requested every time you visit a page on the website and isn't recommended as it could lead to performance issues.
* SASS/SCSS CSS files are used in the website but knowledge in SASS is not required; we have also included equivalent regular CSS files.
* Things not included in the repository:
  * Episode MP3 and M4A files.
  * Episode XML/RSS feeds.
  * Promotional pages (e.g. the Portal 2 Launch Party promo page).
  * Old episode artwork for episodes 1-99.
  * ~~Backup of the Half-Life 3 beta (removed per Valve's request).~~
