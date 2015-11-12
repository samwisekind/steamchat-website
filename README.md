# Steamchat Website Source Files

Here you can find the source files for the Steamchat (formerly "Steamcast") website. We're releasing the entirety of the website so if you're interested in web development and design you can clone this repository to learn, play or modify with. Do anything you want with it, no attribution required!

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

The intended behaviour is having the server rewrite (*not* redirect) requests to episode pages (e.g. `/episodes/50/`) to use `lib/pages/episodePage.php` and pass in two parameters:

| Parameter Name | Value(s) |
|---|---|
| *type* | *"episode"*, *"snack"* |
| *number* | integer |

###### Example:
* User requests `episodes/50/`
* Server rewrites as `lib/pages/pageEpisode.php?type=episode&number=50`

###### Notes:
* Be wary of singular and plural requests; there are additional rules in the [.htaccess](.htaccess) file that *redirects* requests with singular (`/episode/`) to plurals (`/episodes/`)
* Requests with and without trailing slashes ("/")
* The above rules also apply to the Specials and About pages (without any parameters):
 * `/specials/` to `/lib/pages/pageSpecials.php`
 * `/about/` to `/lib/pages/pageAbout.php`

#### Latest Episode Control

The latest episode to be shown on the homepage is controlled by the PHP variable `$latestEpisode` (integer) in [`index.php`](index.php#L3). This is done instead of getting the latest episode from the top of the episode data file (see below) so we can upload episode artwork and data (and test it) before publishing it publically on the website.

#### Episode Data

Episode data is controlled in the [`lib/episodeData.php`](lib/episodeData.php) file. Information on how the arrays are structured can be found in [the comment at the start of the file](lib/episodeData.php#L3-L16).

If you plan on further developing with this repository, we *highly* recommend you use a database to retrieve episode data instead of including and referring to a single PHP file with a large associative array. We provided the episode data file included in the repository purely for reference; it's a ~50Kb file that gets requested every time you visit a page on the website and therefore isn't recommended as it could lead to server performance issues.

#### CSS & JavaScript

SASS/SCSS files are used to compile the CSS for the website but knowledge in SASS is not required; we have also included equivalent regular CSS files.

JavaScript files are closure-compiled and minified, however we have also included human-readable versions.

#### Things Not Included In This Repository:
* Episode MP3 and M4A files.
* Episode XML/RSS feeds.
* Promotional pages (e.g. the Portal 2 Launch Party promo page).
* Old episode artwork for episodes 1-99.
* ~~Backup of the Half-Life 3 beta (removed per Valve's request).~~

## Contributors:
* @Flamov
* @chocolatethunder
