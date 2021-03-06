"use strict";

var gulp = require('gulp');
var gutil = require('gulp-util');
//var concat = require('gulp-concat');
var jade = require('gulp-jade');
var jadeify = require('jadeify');
var stylus = require('gulp-stylus');
var stylus_itself = require('stylus');
var browserify = require('browserify');
var shim = require('browserify-shim');
var prefix = require('gulp-autoprefixer');
var path = require('path');
var _ = require('underscore');
var source = require('vinyl-source-stream');
var nib = require('nib');

// BUILD TASKS FOR THE LIBRARY --------------------------------------

gulp.task('stylus', [], function() {
  // Compiles Stylus to CSS.
  // Compiler output is delivered to the ./generated/ folder.
  // Images referenced from the style rules are converted to data URIs.
  
  return gulp.src('./lib/*.styl')
    .pipe( stylus({ 
      define: { 'url': stylus_itself.url() }
    }) )
    //.pipe( prefix('last 20 versions', 'ie 8', 'ie 9') )
    .pipe( gulp.dest('./generated/') );      
});

gulp.task('build', ['stylus']);
  // Main build task. Executing this task makes the library ready
  // for consumption.

// BUILD TASKS FOR THE TEST PAGE ------------------------------------

gulp.task('test-jade', [], function() {

  return gulp.src('./test/test.jade')
    .pipe( jade({ pretty: true }) )
    .pipe( gulp.dest('./output/') );    
});

gulp.task('test-css', [], function() {

  return gulp.src('./Test/test.styl')
    .pipe( stylus({ use: [nib()], errors: true }) )
    .pipe( prefix('last 20 versions', 'ie 8', 'ie 9') )
    .pipe( gulp.dest('./output/') );
    
});

gulp.task('test-browserify', [], function() {

  return browserify({
      entries: ['./test/main.js'],
      debug: true
    })
    .bundle()
    .pipe( source('main.js') )
    .pipe( gulp.dest('./output/') );
    
});

gulp.task('test-copy', function() {

  return gulp.src( [ /*'./*.js' */ ], { base: './' } )
    .pipe( gulp.dest('./output/') );
});

gulp.task('test-build', ['build', 'test-jade', 'test-css', 'test-browserify', 'test-copy']);

// DEFAULT TASK / WATCHES -----------------------

gulp.task('default', ['test-build'], function() {
  gulp.watch([
    'package.json', 
    './lib/*.js', './lib/*.jade', './lib/*.styl', './generated/*.css',
    './test/*.js', './test/*.jade'
  ], ['test-build']);
});
