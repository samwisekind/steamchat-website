let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/scripts.js', 'public/js')
   .sass('resources/assets/sass/global.scss', 'public/css').options({
      processCssUrls: false
   })
   .sass('resources/assets/sass/index.scss', 'public/css').options({
      processCssUrls: false
   })
   .sass('resources/assets/sass/episode.scss', 'public/css').options({
      processCssUrls: false
   })
   .copy('resources/assets/favicon.ico', 'public')
   .copyDirectory('resources/assets/images', 'public/images');
