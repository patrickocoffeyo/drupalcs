# Drupal Coding Standards

This repository contains a portable Gulp-based tool that checks a Drupal installation for JavaScript and PHP syntax errors.

# Installation
 - Install the latest version of nodejs, npm, and gulp on your computer.
 - Copy the `package.json`, `.jscsrc`, and `gulpfile.js` file from this repo to your Drupal site root.
 - In your Drupal site root, run: `npm install`. This will install the npm modules needed by the gulpfile.
 - Add `node_modules` too your `.gitignore` file. Don't want to commit those npm modules!!
 - Install [PHPCodeSniffer](https://github.com/squizlabs/PHP_CodeSniffer). If your `phpcs` executable isn't in `/usr/local/bin/phpcs`, update the `bin` setting for the phpcs task in `gulpfile.js`.
 
# Use
 - **phpcs**: run `gulp phpcs` to check all module/theme php files for issues.
 - **jscs/lint**: run `gulp lint` to check all module/theme javascript files for issues.

# Credit
[Jon Peck](https://github.com/fluxsauce) - `.jscsrc` file is borrowed from https://github.com/fluxsauce/jscs-drupal/blob/master/.jscsrc
