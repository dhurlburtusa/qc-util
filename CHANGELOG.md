# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

Nothing yet.

## [0.1.0] - 2016-09-23

### Fixed

- Issue with dates on Feb 29th with year < 100.

## [0.1.0] - 2016-09-09

### Added

- Support for the `c` format symbol to the `Date.convert` function.
- Automatic parsing of most common ISO 8601 date formatted strings.
- Support for the `O` and `P` format symbols to the `Date.convert` function
  which allows parsing of timezone offsets.

### Fixed

- Some documentation typos.
