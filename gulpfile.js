// gulp-jsvalidate(validate js files)
// gulp-imagemin
// autoprefixer (css auto prefixer)
// gulp-module 
// jshint (verify js files syntax)

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var spawn = require('child_process').spawn;
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var node;

const BUILD_DIR = 'build';

/**
 * $ gulp rest
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('rest', function() {
    if (node) node.kill()
    node = spawn('node', ['node/app.js'], { stdio: 'inherit' })
    node.on('close', function(code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
})

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})

/**
 * $ gulp webserve
 * run http server on port 3031
 */
gulp.task('webserver', function() {
    gulp.src('')
        .pipe(webserver({
            livereload: {
                enable: true, // need this set to true to enable livereload 
                filter: function(fileName) {
                    if (fileName.match(/.db/)) { // exclude all source maps from livereload 
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            open: true,
            port: 3031,
            fallback: 'index.html'
        }));
});

/**
 * $ gulp sass
 * compile scss files
 */
gulp.task('sass', function() {
    return gulp.src('scss/**/*.scss')
        .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(BUILD_DIR + '/css'))
});

gulp.task('sass:watch', function() {
    gulp.watch('scss/**/*.scss', ['sass']);
});


function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}
/**
 * $ gulp minify
 * Minify the js files
 */
gulp.task('minify', function() {
    return gulp.src('js/**/*.js')
        .pipe(uglify())
        .on('error', errorLog)
        .pipe(gulp.dest(BUILD_DIR + '/js'));
});

gulp.task('minify:watch', function() {
    gulp.watch('js/**/*.js', ['minify']);
});


gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(inject(gulp.src(['bower_components/**/*min.js', 'bower_components/**/*min.css', BUILD_DIR + '/**/*.css', BUILD_DIR + '/**/*.js'], { read: false })))
        .pipe(gulp.dest('.'));
});

gulp.task('filesadded:watch', function() {
    return watch('{js,scss}/**/*.{css,js}', { events: ['add'] }, function() {
        runSequence(['minify', 'sass'], 'html');
    })
});

gulp.task('clean', function() {
    return gulp.src(BUILD_DIR, { read: false })
        .pipe(clean({force: true}));
});

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', function() {
    runSequence('clean', ['minify', 'sass'], 'html', 'rest', 'webserver',['minify:watch', 'sass:watch', 'filesadded:watch']);    
    gulp.watch(['node/app.js'], function() {
        gulp.start('rest')
    })
})
