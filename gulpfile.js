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
const browserSync = require('browser-sync').create()
const buffer = require('vinyl-buffer')
const minify = require('gulp-minify')
const gulpif = require('gulp-if')

//Paths
const srcDir = './app'
const destDir = './build'
const bundleFileName = 'bundle.js'
const entryFileName = 'index.js'

//Create reloader instance
const { reload: browserReload, enable: enableBrowserReload } = createBrowserReloader()

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
	return bundleApp().on('end', () => {
		browserReload()
	})
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
	return gulpSequence('clean', ['scripts', 'copy', 'copyBower'], () => { })
})

gulp.task('default', () => {
	enableBrowserReload()
	return gulpSequence('build', 'watch', () => { })
})

// Private Functions
function createBrowserReloader() {
	let enabled = false
	let initialized = false
	return {
		enable: () => {
			enabled = true
		},
		reload: () => {
			if (initialized) {
				browserSync.reload()
			} else if (enabled) {
				browserSync.init({
					server: {
						baseDir: destDir,
					},
					logLevel: 'silent',
					port: 3000,
					notify: false,
				})
				initialized = true
			}
		},
	}
}

function onFileChange(vinyl) {
	if (vinyl.extname !== undefined) {
		if (vinyl.extname === '.js') {
			gulp.start('scripts')
		} else {
			const path = vinyl.relative
				.replace('\\', '/')
				.split('/')
				.slice(1)
				.join('/')
			if (vinyl.event === 'unlink') {
				gutil.log(`Delete '${path}'`)
				del([`${destDir}/${path}`]).then(browserReload)
			} else if (vinyl.event === 'change' || vinyl.event === 'add') {
				gutil.log(`Copy '${path}'`)
				gulp
					.src([`${vinyl.relative}`], { nodir: true })
					.pipe(gulpCopy(destDir, { prefix: 1 }))
					.on('finish', browserReload)
			}
		}
	}
}

function bundleApp() {
	const isProduction = process.env.NODE_ENV === 'production'
	const globalVars = {
		CONFIG: () => JSON.stringify({
			apiUrl: process.env.API_URL || 'http://localhost:8080/api/',
			socketServerUrl: process.env.SOCKET_URL || 'http://localhost:8080',
		}),
	}
	return browserify({
		entries: `${srcDir}/${entryFileName}`,
		debug: true,
		insertGlobalVars: globalVars,
	})
		.transform('babelify', {
			presets: ['env'],
			plugins: [
				'transform-react-jsx',
				'transform-object-rest-spread',
				'transform-class-properties',
				'emotion',
			],
		})
		.bundle()
		.on('error', (e) => {
			if (e.codeFrame) {
				console.log(e.toString())
				console.log(e.codeFrame)
			} else {
				console.log(e)
			}
		})
		.pipe(source(bundleFileName))
		.pipe(gulpif(isProduction, buffer()))
		.pipe(gulpif(isProduction, minify({
			ext: {
				src: '-debug.js',
				min: '.js',
			},
			noSource: true,
			exclude: ['tasks'],
			ignoreFiles: ['.combo.js', '-min.js'],
		})))
		.pipe(gulp.dest(destDir))
}