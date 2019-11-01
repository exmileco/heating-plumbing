const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const tinfier = require('gulp-tinifier');
var options = {
  key: 'vl70KZXvc5M4SZdDWHqSTcRpJdw93PMw',
  verbose: true
};
var gutil = require('gulp-util');
var ftp = require('gulp-ftp');
var replace = require('gulp-replace-async');

/* Сжать и перенести CSS файлы */
gulp.task('move-css', () => {
  return gulp.src('src/css/*.min.css')
  // .pipe(cleanCSS())
  .pipe(gulp.dest('dist/css'))
});

gulp.task('minify-css', () => {
  return gulp.src(['src/css/*.css', '!src/js/*.min.css'])
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
});

/* Перенести сжатые JS файлы */
gulp.task('move-js', () => {
  return gulp.src('src/js/*.min.js')
  .pipe(gulp.dest('dist/js'))
});

/* Сжать JS файлы */
gulp.task('minify-js', () => {
  return gulp.src(['src/js/*.js', '!src/js/*.min.js'])
  .pipe(jsmin())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('dist/js'))
})

/*  */
gulp.task('html-min', () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'))
})

/* Сжать изображения и перенести в dist */
gulp.task('image-min', () => {
  return gulp.src('src/img/**/*.*')
    .pipe(tinfier(options))
    .pipe(gulp.dest('dist/img'))
});

/* Перенести файлы шрифтов */
gulp.task('move-fonts', () => {
  return gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'))
});

/* Перенести php файлы */
gulp.task('move-php', () => {
  return gulp.src('src/**/*.php')
    .pipe(gulp.dest('dist/'))
});

gulp.task('upload-ftp', () => {
  return gulp.src('dist/**/*.*')
    .pipe(ftp({
      host: 'coffeenglish.com',
      user: 'coffeeng',
      pass: 'Z76F34wyjv',
      remotePath: '/gloacad-hw.coffeenglish.com/lesson25/optional/'
    }))
    // you need to have some kind of stream after gulp-ftp to make sure it's flushed
    // this can be a gulp plugin, gulp.dest, or any kind of stream
    // here we use a passthrough stream
    .pipe(gutil.noop());
});

gulp.task('replace-mins', () => {
  return gulp.src('dist/index.html')
    // .pipe(replace('style.css', 'style.min.css'))
    // .pipe(replace('main.js', 'main.min.js'))
    .pipe(replace('style.css', function (match, callback) {
      callback(null, 'style.min.css');
    }))
    .pipe(replace('main.js', function (match, callback) {
      callback(null, 'main.min.js');
    }))
      .pipe(gulp.dest('dist'))
});
gulp.task('replace-custom-mins', () => {
  return gulp.src('dist/map.html')
    .pipe(replace('style.css', function (match, callback) {
      callback(null, 'style.min.css');
    }))
    .pipe(replace('main.js', function (match, callback) {
      callback(null, 'main.min.js');
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('dist-din', gulp.series('move-css', 'minify-css', 'move-js', 'minify-js', 'html-min', 'replace-mins', 'move-php'))
gulp.task('dist-stat', gulp.series('image-min', 'move-fonts'))