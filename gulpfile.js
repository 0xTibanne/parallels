var gulp        = require('gulp'),
    sass        = require('gulp-ruby-sass'),
    prefix      = require('gulp-autoprefixer'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    imagemin    = require('gulp-imagemin'),
    rename      = require('gulp-rename'),
    compressor  = require('gulp-compressor');

// Paths

var paths = {
  scripts: [
    'vendor/jquery/dist/jquery.js',
    'vendor/jquery.easing/js/jquery.easing.js',
    'vendor/jquery-waypoints/waypoints.js',
    'vendor/glidejs/dist/jquery.glide.js',
    'vendor/isotope/dist/isotope.pkgd.js',
    'vendor/jquery-keep-the-rhythm/jquery.keeptherhythm.js',
    'js/develop.js'
  ],
  styles: [
    'vendor/animate.css/animate.css',
    'scss/**/*.scss'
  ],
  images: [
    'images/**/*'
  ]
}

// default
gulp.task('default', ['styles', 'scripts']);

// styles
gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(sass({ compass: true, style: 'expanded', sourcemap: true }))
    .pipe(prefix('last 3 version', 'ie 8', 'ie 9', 'Opera 12.1'))
    .pipe(gulp.dest('css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(compressor())
    .pipe(gulp.dest('css/'));
});

// scripts
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('js/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'));
});

// images
// gulp.task('images', function() {
//   gulp.src(paths.images)
//     .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
//     .pipe(gulp.dest('images/optimized/'));
// });

// watch
gulp.watch('js/develop.js', ['scripts']);
gulp.watch('scss/**/*.scss', ['styles']);
// gulp.watch('src/images/**/*', ['images']);