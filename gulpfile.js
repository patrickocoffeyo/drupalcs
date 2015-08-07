/**
 * @file
 * Portable Gulp tool that checks a Drupal installation for
 * JavaScript and PHP syntax errors.
 */
(function () {
  'use strict';

  var gulp = require('gulp'),
      eslint = require('gulp-eslint'),
      jscs = require('gulp-jscs'),
      phplint = require('phplint').lint,
      tap = require('gulp-tap'),
      execSync = require('sync-exec'),
      gulpHelp = require('gulp-help')(gulp),
      options = require('minimist')(process.argv.slice(2));


  /**
   * @task js
   * Lints and scans js files for formatting errors.
   */
  gulp.task('js', 'Lints and scans js files for formatting errors.', function () {
    return gulp.src([
      'gulpfile.js',
      'sites/all/modules/custom/**/*.js',
      'sites/all/modules/features/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(jscs());
  });

  /**
   * @task php
   * Lints and scans php files for formatting errors.
   */
  gulp.task('php', 'Lints and scans php files for formatting errors.', function () {
    // Source file defaults to a pattern.
    var extensions = '{php,module,inc,install,test,profile,theme}',
        sourcePatterns = [
          'sites/all/modules/custom/**/*.' + extensions,
          'sites/all/modules/features/**/*.' + extensions,
          'sites/all/themes/custom/**/*.' + extensions
        ],
        excludePatterns = [
          '!**/*.apachesolr_environments.inc',
          '!**/*.apachesolr_search_defaults.inc',
          '!**/*.context.inc',
          '!**/*.features.*.inc',
          '!**/*.features.inc',
          '!**/*.field_group.inc',
          '!**/*.pages_default.inc',
          '!**/*.strongarm.inc',
          '!**/*.views_default.inc'
        ];

    // If path is provided, override.
    if (options.hasOwnProperty('path') && options.path.length > 0) {
      sourcePatterns = [
        options.path + '/*.' + extensions,
        options.path + '/**/*.' + extensions
      ];
    }

    // Merge sourcePatters with excludePatterns.
    sourcePatterns = sourcePatterns.concat(excludePatterns);

    // Run phpcs.
    gulp.src(sourcePatterns)
    .pipe(tap(function (file) {
      var report = execSync('./vendor/bin/phpcs --standard="./.phpcsrc.xml" ' + file.path);
      if (report.stdout.length > 0) {
        // Log report, and remove silly Code Sniffer 2.0 ad.
        console.log(report.stdout.split('UPGRADE TO PHP_CODESNIFFER 2.0 TO FIX ERRORS AUTOMATICALLY')[0]);
      }
    }));

    // Llint php source files.
    phplint(sourcePatterns, {limit: 50}, function (err, stdout, stderr) {
      if (err) {
        console.log(err);
      }
    });
  }, {
    options: {
      'path': 'Takes a path to a directory or file that should be selectively scanned.'
    }
  });
})();
