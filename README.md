# Drupal Coding Standards
This repository contains a portable Gulp-based tool that lints custom JavaScript and PHP files, and checks them for coding standards violations.

## Requirements
 * [Node.js & NPM](https://github.com/creationix/nvm)
 * [Composer](https://getcomposer.org/download)

## Installation
 * Copy these files from this repository to your Drupal site root:
   * `package.json`
   * `composer.json`
   * `.jscsrc`
   * `.eslintrc`
   * `.phpcsrc.xml`
   * `gulpfile.js`
 * Run the following command in your Drupal site root:
   * `npm install`
   * `composer install`
 * Add `node_modules` and `vendor` too your `.gitignore` file so that you don't commit module/vendor files.

## Use
To get a full list of tasks and documentation, run `gulp` in your Drupal site root.

 * `gulp php`: Lints and scans php files for formatting errors.
 * `gulp js`: Lints and scans js files for formatting errors.

## Credit
[Jon Peck](https://github.com/fluxsauce) - `.jscsrc` file is borrowed from https://github.com/fluxsauce/jscs-drupal/blob/master/.jscsrc
