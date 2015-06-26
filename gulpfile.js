// Node dependencies
var del = require('del'),
    rs = require('run-sequence');

// gulp dependencies
var gulp = require('gulp'),
    sass = require('gulp-sass'),
	babel = require("gulp-babel"),
	sourcemaps = require("gulp-sourcemaps"),
    htmlreplace = require('gulp-html-replace'),
    connect = require('gulp-connect'),
    modRewrite = require('connect-modrewrite'),
    minify = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');


// Config
var dest = 'dist/',
    src = 'src/';

// clean out the dist directory
gulp.task('clean', function(cb) {
    del(['dist'], cb);
});


gulp.task('css', function() {
    gulp.src(src + 'sass/styles.scss')
        .pipe(concat('styles.css'))
        .pipe(sass())
        .pipe(gulp.dest(dest + 'css/'))
        .pipe(minify())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(dest + 'css/'))
        .pipe(connect.reload());
});

// Discovers all dependencies, concatenates together all required .js files, minifies them
gulp.task("js", function () {
  return gulp.src(["src/js/*.js"])
    .pipe(sourcemaps.init())
    .pipe(concat("all.js"))
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(dest + "js"))
    .pipe(connect.reload());
});

// Save html to dist
gulp.task('html', function() {
    gulp.src('src/**/*.html')
        .pipe(htmlreplace({
            'css': 'css/styles.min.css',
            'js': 'js/all.js'
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
    gulp.src('src/js/vendor/*.js')
    .pipe(gulp.dest(dest + "js"));
});

gulp.task('images', function() {
    gulp.src('src/images/*', {
            base: './src/'
        })
        .pipe(gulp.dest('dist/'));
});

// Connect (Livereload)
gulp.task('connect', function() {
    connect.server({
        root: ['dist/'],
        livereload: true,
        middleware: function() {
            return [
                modRewrite([
                    '^/$ /index.html',
                    '^([^\\.]+)$ $1.html'
                ])
            ];
        }
    });
});

gulp.task('watch', function() {
    gulp.watch(src + '/**/*.js', ['js']);
    gulp.watch(src + '/**/*.scss', ['css']);
    gulp.watch(src + '/**/*.html', ['html']);
});

gulp.task('build', function(callback) {
    rs('clean', ['js', 'css', 'html', 'images'], callback);
});

gulp.task('default', function(callback) {
    rs('build', 'watch', 'connect', callback);
});
