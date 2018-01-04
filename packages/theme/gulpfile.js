'use strict'

const gulp = require('gulp')
const postcss = require('gulp-postcss')
const cssmin = require('gulp-cssmin')
const less = require('gulp-less')

const stripDebug = require('gulp-strip-debug')
const del = require('del')
const vinylPaths = require('vinyl-paths')

gulp.task('clear', function () {
  return gulp.src('./css')
    .pipe(stripDebug())
    .pipe(vinylPaths(del))
})

gulp.task('compile', function() {
  return gulp.src('./src/*.less')
    .pipe(less())
    .pipe(postcss())
    .pipe(cssmin())
    .pipe(gulp.dest('./css'))
})

gulp.task('copyfont', function() {
  return gulp.src('./src/fonts/**')
    .pipe(cssmin())
    .pipe(gulp.dest('./lib/fonts'))
})


gulp.task('build', ['clear', 'compile', 'copyfont'])
gulp.task('watch', function () {
  gulp.watch('./src/*.less', ['compile'])
})
