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

gulp.task('build', ['clear', 'compile'])
gulp.task('build2', ['compile'])
gulp.task('watch', function () {
  gulp.watch('./src/*.less', ['build2'])
})
