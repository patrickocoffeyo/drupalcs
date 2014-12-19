/**
 * @file
 * Portable Gulp tool that checks a Drupal installation for
 * JavaScript and PHP syntax errors.
 */
/* globals require */

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs')
    prompt = require('gulp-prompt'),
    shell = require('gulp-shell'),
    phpcs = require('gulp-phpcs');

/**
 * Coding Standards
 * The following code provides two tasks, one for ensuring JavaScript code
 * quality, and the other for ensuring PHP code quality.
 *
 * @task lint
 *   Runs JSCS and JSLint on module, theme, and gulp files. Excludes all
 *   minified JavaScript files.
 */
gulp.task('lint', function () {
  return gulp.src([
    'sites/all/themes/**/*.js',
    'sites/all/modules/custom/**/*.js',
    'sites/all/modules/features/**/*.js',
    '!sites/all/themes/**/*.min.js',
    '!sites/all/modules/custom/**/*.min.js',
    '!sites/all/modules/features/**/*.min.js',
    'gulpfile.js'
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jscs());
});

/**
 * @task phpcs
 *   Runs PHPCS on all module and theme PHP. PHP bin set to the
 *   /usr/local/bin/phpcs exe by default, but should be updated to
 *   wherever your phpcs exe is located.
 */
gulp.task('phpcs', function () {
  return gulp.src([
    'sites/all/themes/**/*.php',
    'sites/all/modules/custom/**/*.php',
    'sites/all/modules/custom/**/*.module',
    'sites/all/modules/custom/**/*.inc',
    'sites/all/modules/features/**/*.php',
    'sites/all/modules/features/**/*.module',
    'sites/all/modules/features/**/*.inc',
  ])
  .pipe(phpcs({
    bin: '/usr/local/bin/phpcs',
    standard: 'PSR2',
    warningSeverity: 0
  }))
  .pipe(phpcs.reporter('log'))
  .pipe(phpcs.reporter('fail'));
});
