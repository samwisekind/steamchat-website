# Steamchat Website Source Files

[![codebeat badge](https://codebeat.co/badges/714c3b1a-bcb9-4e10-8644-b875be03ec89)](https://codebeat.co/projects/github-com-flamov-steamchat-website-master) [![Code Climate](https://codeclimate.com/github/Flamov/steamchat-website/badges/gpa.svg)](https://codeclimate.com/github/Flamov/steamchat-website) [![Issue Count](https://codeclimate.com/github/Flamov/steamchat-website/badges/issue_count.svg)](https://codeclimate.com/github/Flamov/steamchat-website)

These are the source files for the [Steamchat Podcast website](http://www.thesteamchat.com/).

### Requirements

The website uses [Laravel](https://www.laravel.com/), which has its own [set of requirements that you can find here](https://laravel.com/docs/5.4/installation#server-requirements). Additionally, CSS is compiled using Sass, and JavaScript is written in a mixture of vanilla JavaScript and Vue.

For more information on how the website is structured, [check out the wiki](https://github.com/Flamov/steamchat-website/wiki).

### Repository Branches

| Branch Name | Notes |
|---|---|
| `master` | Used for deployment of the [production website](http://www.thesteamchat.com/). |
| `dev` | Development branch. |

### Database Data

You can find an occasionally-updated [MySQL database dump here](https://gist.github.com/Flamov/d0fbca7ec66783027b14b244d086af73). Episode audio files, artwork, and transcripts are hosted elsewhere.

### SVG Support

The website makes use of SVG files. Make sure your web server is configured to pass the correct MIME type for SVG files.

### Things Not Included In This Repository:
* Episode MP3 and M4A files
* Episode artwork
* Episode transcripts
* ~~Backup of the Half-Life 3 beta (removed per Valve's request)~~

### Contributors:
* [@Flamov](https://www.github.com/Flamov)
* [@chocolatethunder](https://www.github.com/chocolatethunder)

### Credits:
* Some icons used are provided by _feather_: https://www.github.com/colebemis/feather
