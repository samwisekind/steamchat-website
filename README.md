# Steamchat Website Source Files

Here you can find the source files for the Steamchat (formerly "Steamcast") website. If you're interested in web development and design you can clone this repository to learn, play or modify with at your leisure. Do anything you want with it, no attribution required!

The website included in this repository is the version from 2013 onwards. We have updated it from its [original state](https://github.com/Flamov/steamchat-website/tree/c6ec7d23f21fbf421eb74abe7b1a97b9d83ec0c9) to be more sanely coded as well as clean up the original files, add CSS3 support, as well as a bunch of other additions and improvements.

## Requirements

If you plan on hosting the website in a local environment or otherwise, the following is required:

* PHP 5.4 or greater
* Access to `.htaccess` for Apache or equivalent directory-level configuration
 * Must have `RewriteEngine` or equivalent enabled

## Installation

1. Set up a web server following the [requirements](#requirements) above
2. Clone this repository or [download the ZIP](https://github.com/Flamov/steamchat-website/archive/master.zip) and place the files in the web server
3. Make sure the [`.htaccess`](.htaccess) file is working as intended ([see below](#intended-htaccess-behaviourconfiguration))

## Things To Note

#### Intended .htaccess Behaviour/Configuration

The intended behaviour is having the server rewrite (*not* redirect) requests to episode pages (e.g. `/episodes/50/`) as `lib/pages/episodePage.php` while passing in two URL parameters:

| Parameter Name | Value(s) |
|---|---|
| *type* | *"episode"*, *"snack"* |
| *number* | integer |

###### Example:
* User requests `episodes/50/`
* Server rewrites as `lib/pages/pageEpisode.php?type=episode&number=50`

###### Notes:
* Be wary of singular and plural requests; there are additional rules in the [.htaccess](.htaccess#L16-L18) file that *redirects* requests with singular notations (`/episode/`) to plural ones (`/episodes/`)
* Also be wary of requests with and without trailing slashes ("/")
* The above rewrite rules also apply to the Specials and About pages (no URL parameters or singular/plural rules required):
 * `/specials/` as `/lib/pages/pageSpecials.php`
 * `/about/` as `/lib/pages/pageAbout.php`

In addition, when a user requests an episode page with "`/download/`" appended to the end (e.g. `/episodes/50/download/`, both with and without a trailing slash) it will rewrite as `/lib/pages/pageEpisode.php?type=episode&number=50&download`. A value for the `download` URL parameter is not required.

#### SVG Support

The website uses SVGs for its logos and icons instead of bitmaps. Make sure your web server is configured to pass the correct MIME type for SVGs ([more info here](http://www.kaioa.com/node/45)) — this should be enabled with lines 25-26 in the [`.htaccess`](.htaccess#L25-L26) file included in this repository.

#### Latest Episode Control

The latest episode to be shown on the homepage and individual episode pages is controlled by the PHP variable `$latestEpisode` (integer) at line 3 in [`episodeData.php`](lib/episodeData.php#L3). This is done instead of automatically retrieving the latest episode from the first index of the episode data file (see below) so we can upload episode artwork and data (and test it) before publishing it publically on the website.

#### Episode Data

Episode data is controlled in the [`lib/episodeData.php`](lib/episodeData.php) file. Information on how the arrays are structured can be found in [the comment (lines 5-18) at the start of the file](lib/episodeData.php#L5-L18).

If you plan on further developing with this repository, we *highly* recommend you use a database to retrieve episode data instead of including and referring to a single PHP file with a large associative array. We provided the episode data file included in the repository purely for reference; it's a ~50Kb file that gets requested every time you visit a page on the website and therefore isn't recommended as it could lead to server performance issues.

#### CSS & JavaScript

SASS/SCSS files are used to compile the CSS for the website but knowledge in SASS is not required; we have also included human-readable versions of the CSS.

In addition, JavaScript files are closure-compiled and minified however we have also included human-readable versions as well.

#### Things Not Included In This Repository:
* Episode MP3 and M4A files
* Episode XML/RSS feeds
* Promotional pages (e.g. the Portal 2 Launch Party promo page)
* Old episode artwork for episodes 1-99
* ~~Backup of the Half-Life 3 beta (removed per Valve's request)~~

## Contributors:
* [@Flamov](https://www.github.com/Flamov)
* [@chocolatethunder](https://www.github.com/chocolatethunder)
