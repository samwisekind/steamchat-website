/* COMMON */

// Common required NPM packages
var gulp = require('gulp'); // http://www.gulpjs.com/

// Get the full path of the folder
var targetDirectory = process.env.INIT_CWD;

// Default Gulp task uses the 'build' task instead
gulp.task('default', ['build']);



/* BUILDING */

// Required NPM packages for building
var argv = require('yargs').argv; // https://www.npmjs.com/package/yargs
var gutil = require('gulp-util'); // https://www.npmjs.com/package/gulp-util
var del = require('del'); // https://www.npmjs.com/package/del
var cleanHTML = require('gulp-htmlmin'); // https://github.com/jonschlinkert/gulp-htmlmin
var zip = require('gulp-zip'); // https://www.npmjs.com/package/gulp-zip

// Set variable for the hidden folder during compliation
var targetDestDirectory = ".build";

// Build starting task with error handling
gulp.task('build-init', function () {

	if (argv.noarchive === undefined && argv.buildnumber === undefined) {
		// Error if neither flag is defined
		gutil.log(
			gutil.colors.red('Build Error: You must either flag'),
			gutil.colors.bgRed('--buildnumber'),
			gutil.colors.red('or'),
			gutil.colors.bgRed('--noarchive') + gutil.colors.red('!')
		).beep();
		process.exit();
	}
	else if (argv.noarchive !== undefined && argv.buildnumber !== undefined) {
		// Error if both flags are defined at the same time
		gutil.log(
			gutil.colors.red('Build Error: You can only use'),
			gutil.colors.bgRed('--buildnumber'),
			gutil.colors.red('or'),
			gutil.colors.bgRed('--noarchive'),
			gutil.colors.red('at once!')
		).beep();
		process.exit();
	}
	else if ((argv.noarchive === undefined && argv.buildnumber !== undefined) && (Number(argv.buildnumber) !== argv.buildnumber || argv.buildnumber % 1 !== 0 || argv.buildnumber < 1)) {
		// Error if the --buildnumber flag is not set or if its value is not an integer or an interger less than 1
		gutil.log(
			gutil.colors.red('Build Error: You must provide a value for'),
			gutil.colors.bgRed('--buildnumber'),
			gutil.colors.red('(which must be an'),
			gutil.colors.bgBlue('integer') + gutil.colors.red(')!')
		).beep();
		process.exit();
	}
	else{
		return true;
	}

});

// Deletes the old .build and non-archived build folders
gulp.task('build-delete', ['build-init'], function () {

	var array = [
		targetDirectory + '/' + targetDestDirectory
	];

	if (argv.noarchive !== undefined) {
		array.push(targetDirectory + '/public-build/**/*');
	}

	return del(array, {
			force: true
		});

});

// Copies the directory and all the files and subfolders to a new hidden folder
gulp.task('build-copy', ['build-delete'], function () {

	var files = [
		targetDirectory + '/public/**', // Copy everything...
		targetDirectory + '/public/**/.*', // ...including hidden files,...
		'!' + targetDirectory + '/public/node_modules{,/**}', // ...except the node_modules folder,...
		'!' + targetDirectory + '/public/scss{,/**}', // ...the SCSS folder,...
		'!' + targetDirectory + '/public/css/*.css', // ...the uncompressed CSS files,...
		'!' + targetDirectory + '/public/js/**/!(*.min.js)', // ...the JavaScript files (but keep the compiled ones, i.e. *.min.js),...
		'!' + targetDirectory + '/public/package.json', // ...the package.json,...
		'!' + targetDirectory + '/public/gulpfile.js', // ...the gulpfile,...
		'!' + targetDirectory + '/public/README.md', // ...the readme file,...
		'!' + targetDirectory + '/public/**/.DS_Store' // ...and macOS hidden files.
	];

	return gulp.src(files)
		.pipe(gulp.dest(targetDirectory + '/' + targetDestDirectory));

});

// Cleans the HTML (PHP) files by removing whitespace and comments
gulp.task('build-html', ['build-copy'], function () {

	// Since the header and footer have partial HTML (unclosed tags), we can
	// only minifiy the individual page HTML as 'html-minifier' does not currently
	// support this behaviour. See https://github.com/kangax/html-minifier/issues/743.

	return gulp.src(targetDirectory + '/' + targetDestDirectory + '/lib/pages/*.php')
		.pipe(cleanHTML({
			collapseWhitespace: true,
			removeComments: true,
			includeAutoGeneratedTags: false
		}))
		.pipe(gulp.dest(targetDirectory + '/' + targetDestDirectory + '/lib/pages/'));

});

// Deletes files generated during the build processes that cause unnecessary overhead
gulp.task('build-overhead', ['build-html'], function () {

	return del([
			targetDirectory + '/' + targetDestDirectory + '/**/.DS_Store'
		], {
			force: true
		});

});

// Prepares the processed files for use
gulp.task('build-prepare', ['build-overhead'], function () {

	if (argv.noarchive !== undefined) {

		// If using the --noarchive flag, renames the hidden folder to the '-build' folder and places it outside the target folder

		return gulp.src([
				targetDirectory + '/' + targetDestDirectory + '/**/*',
				targetDirectory + '/' + targetDestDirectory + '/**/.*'
			])
			.pipe(gulp.dest(targetDirectory + '/public-build'));

	}
	else {

		// Get the folder name from the above path
		var targetDirectoryName = targetDirectory.split('/').pop();

		// If using the --buildnumber flag, renames the hidden folder to the '-build' folder and places it outside the target folder

		var today = new Date();
		var dd = String(today.getDate());
		var mm = String(today.getMonth() + 1);
		var yyyy = String(today.getFullYear());

		return gulp.src(targetDirectory + '/' + targetDestDirectory + '/**/*')
			.pipe(zip(targetDirectoryName + '-' + (dd + mm + yyyy) + '-' + argv.buildnumber + '.zip'))
			.pipe(gulp.dest(targetDirectory + '/builds/'));

	}

});

// Delete the old hidden folder (for the task set when not using the --noarchive flag)
gulp.task('build-clean', ['build-prepare'], function () {

	return del([
			targetDirectory + '/' + targetDestDirectory
		], {
			force: true
		});

});

// Gulp task for building
gulp.task('build', [
	'build-init',
	'build-delete',
	'build-copy',
	'build-html',
	'build-overhead',
	'build-prepare',
	'build-clean'
], function () {

	gutil.log(
		gutil.colors.green('Build Success!')
	).beep();

});



/* SCSS */

// Required NPM packages for SCSS compilation
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var using = require('gulp-using');

// Main task for SCSS/CSS/sourcemap compilation
gulp.task('sass', function () {

	var targetSrc = targetDirectory + '/public/scss/';
	var targetDest = targetDirectory + '/public/css/';

	gulp.watch(targetSrc + '**/*.scss', function () {

		gulp.src(targetSrc + '*.scss')
			.pipe(changed(targetDest + 'min', {
				extension: '.min.css'
			}))
			.pipe(using({
				path: 'relative',
				prefix: 'Compiling',
				color: 'yellow',
				filesize: true
			}));

		gulp.src(targetSrc + '**/*.scss')
			.pipe(sass({
				includePaths: ['_/sass/']
			}).on('error', sass.logError))
			.pipe(gulp.dest(targetDest));

		gulp.src(targetSrc + '**/*.scss')
			.pipe(sourcemaps.init())
			.pipe(sass({
				includePaths: ['_/sass/'],
				outputStyle: 'compressed'
			}).on('error', sass.logError))
			.pipe(rename({
				extname: '.min.css'
			}))
			.pipe(sourcemaps.write('./maps'))
			.pipe(gulp.dest(targetDest + 'min'));

	});

});

// Gulp task for compiling SCSS
gulp.task('scss', ['sass']);