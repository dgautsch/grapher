// Node dependencies
var del = require('del'),
    rs = require('run-sequence');

// gulp dependencies
var gulp = require('gulp'),
    babel = require("gulp-babel"),
    babelify = require('babelify'),
    browserify = require('browserify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    htmlreplace = require('gulp-html-replace'),
    minify = require('gulp-minify-css'),
    modRewrite = require('connect-modrewrite'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    sourcemaps = require("gulp-sourcemaps");


// Config
var dest = 'dist/',
    src = 'src/';

var vendorJS = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/lodash/index.js'
];

// clean out the dist directory
gulp.task('clean', function (cb) {
    del(['dist'], cb);
});


gulp.task('css', function () {
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

// Builds ES2015 with BabelJS
gulp.task("babel-js", function () {
    return gulp.src(["src/modules/*.js"])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(dest + "js"));
});

// Concats and sourcempas vendor JS
gulp.task("js", function () {
    return gulp.src(vendorJS)
        .pipe(sourcemaps.init())
        .pipe(concat("vendor.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(dest + "js/vendor"));
});

// Export ES6 Modules
gulp.task('modules', function () {
    browserify({
        entries: './src/main.js',
        debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('output.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload());
});

// Save html to dist
gulp.task('html', function () {
    gulp.src([src + '**/*.html'])
        .pipe(htmlreplace({
            'css': 'css/styles.min.css',
            'js': 'js/vendor/vendor.js',
            'babel-js': 'js/output.js'
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
    gulp.src(src + "favicon.ico")
        .pipe(gulp.dest('dist/'));
});

gulp.task('images', function () {
    gulp.src('src/images/*', {
            base: './src/'
        })
        .pipe(gulp.dest('dist/'));
});

// Connect (Livereload)
gulp.task('connect', function () {
    connect.server({
        root: ['dist/'],
        livereload: true,
        middleware: function () {
            return [
                modRewrite([
                    '^/$ /index.html',
                    '^([^\\.]+)$ $1.html'
                ])
            ];
        }
    });
});

gulp.task('watch', function () {
    gulp.watch(src + '/**/*.js', ['babel-js', 'modules']);
    gulp.watch(src + '/**/*.scss', ['css']);
    gulp.watch(src + '/**/*.html', ['html']);
});

gulp.task('build', function (callback) {
    rs('clean', ['js', 'babel-js', 'modules', 'css', 'html', 'images'], callback);
});

gulp.task('default', function (callback) {
    rs('build', 'watch', 'connect', callback);
});
