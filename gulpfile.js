/* eslint no-console: 0 */
const gulp = require('gulp')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const gutil = require('gulp-util')
const del = require('del')
const gulpSequence = require('gulp-sequence')
const watch = require('gulp-watch')
const colors = require('colors/safe')
const gulpCopy = require('gulp-copy')

//Paths
const srcDir = './app'
const destDir = './build'
const bundleFileName = 'bundle.js'
const entryFileName = 'index.js'

// Gulp tasks
gulp.task('copy', () => {
	return gulp.src(
		[`${srcDir}/**/*`, `!${srcDir}/**/*.js`],	//Copy everything besides .js files
		{ nodir: true }
	).pipe(gulp.dest(destDir))
})
gulp.task('copyBower', () => {
	return gulp.src(['./bower_components/**/*'], { nodir: true })  //Copy bower_components
		.pipe(gulp.dest(`${destDir}/bower_components`))
})

gulp.task('scripts', function () {
	bundleApp()
})

gulp.task('watch', function () {
	gulp
		.src(srcDir)
		.pipe(watch(srcDir, onFileChange))
		.on('error', (error) => {
			gutil.log(colors.red('Error'))
			console.log(error)
		})
})

gulp.task('clean', () => {
	return del([
		destDir + '/**/*',
	])
})

gulp.task('build', () => {
	return gulpSequence('clean', ['scripts', 'copy', 'copyBower'], () => {})
})

gulp.task('default', () => {
	return gulpSequence('build', 'watch', () => {})
})

// Private Functions
function onFileChange(vinyl) {
	if (vinyl.extname === '.js') {
		gulp.start('scripts')
	} else if (vinyl.extname !== undefined) {
		const path = vinyl.relative
			.replace('\\', '/')
			.split('/')
			.slice(1)
			.join('/')
		if (vinyl.event === 'unlink') {
			gutil.log(`Delete '${path}'`)
			del([`${destDir}/${path}`])
		} else if (vinyl.event === 'change' || vinyl.event === 'add') {
			gutil.log(`Copy '${path}'`)
			gulp
				.src([`${vinyl.relative}`], { nodir: true })
				.pipe(gulpCopy(destDir, { prefix: 1 }))
		}
	}
}

function bundleApp() {
	browserify({
		entries: `${srcDir}/${entryFileName}`,
		debug: true,
	})
		.transform('babelify', {
			presets: ['es2015'],
			plugins: [
				'transform-react-jsx',
				'transform-object-rest-spread',
				'transform-class-properties',
				'emotion',
			],
		})
		.bundle()
		.on('error', (e) => {
			if(e.codeFrame) {
				console.log(e.toString())
				console.log(e.codeFrame)
			} else {
				console.log(e)
			}
			
		})
		.pipe(source(bundleFileName))
		.pipe(gulp.dest(destDir))
}