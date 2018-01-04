'use strict'

const gulp = require('gulp')
const postcss = require('gulp-postcss')
const cssmin = require('gulp-cssmin')
const less = require('gulp-less')

gulp.task('compile', function() {
  return gulp.src('./src/*.less')
    .pipe(less())
    .pipe(postcss())
    .pipe(cssmin())
    .pipe(gulp.dest('../../lib/css'))
});

gulp.task('copyfont', function() {
  return gulp.src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./lib/fonts'))
});


gulp.task('build', ['compile', 'copyfont'])
gulp.task('watch', function () {
  gulp.watch('./src/*.less', ['compile'])
})
