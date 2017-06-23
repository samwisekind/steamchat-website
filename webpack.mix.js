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

mix//.js('resources/assets/js/app.js', 'public/js')
   .sass('resources/assets/sass/styleGlobal.scss', 'public/css').options({
      processCssUrls: false
   })
   .sass('resources/assets/sass/styleIndex.scss', 'public/css').options({
      processCssUrls: false
   })
   .js('resources/assets/js/scripts.js', 'public/js')
   .copyDirectory('resources/assets/images', 'public/images');
