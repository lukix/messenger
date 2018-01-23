const gulp = require('gulp')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const gutil = require('gulp-util')
const del = require('del')

//Paths
const srcDir = './app'
const destDir = './build'

// Gulp tasks
// ----------------------------------------------------------------------------
gulp.task('copy', () => {
	return gulp.src(
		[srcDir + '/**/*', '!' + srcDir + '/**/*.js'],	//Copy everything besides .js files
		{ nodir: true }
	).pipe(gulp.dest(destDir))
})
gulp.task('copyBower', () => {
	return gulp.src(['./bower_components/**/*'], { nodir: true })  //Copy bower_components
		.pipe(gulp.dest(destDir + '/bower_components'))
})

gulp.task('scripts', function () {
	bundleApp()
})

gulp.task('watch', ['scripts', 'copy', 'copyBower'], function () {
	gulp.watch([srcDir + '/**/*'], ['scripts', 'copy'])
})

gulp.task('clean', () => {
	return del([
		destDir + '/**/*',
	])
})

// When running 'gulp' on the terminal this task will fire.
// It will start watching for changes in every .js file.
// If there's a change, the task 'scripts' defined above will fire.
gulp.task('default', ['scripts','watch','copyBower'])

// Private Functions
// ----------------------------------------------------------------------------
function bundleApp() {
	browserify({
		entries: srcDir + '/index.js',
		debug: true,
	})
		.transform('babelify', {
			presets: ['es2015'],
			plugins: [
				'transform-react-jsx',
				'transform-object-rest-spread',
				'transform-class-properties',
			],
		})
		.bundle()
		.on('error', gutil.log)
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(destDir))
}