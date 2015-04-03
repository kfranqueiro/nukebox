# Nukebox

Nukebox is a music player built using [atom-shell](https://github.com/atom/atom-shell/) and
[dgrid](http://dgrid.io/).

# Build Instructions

First, make sure you have the [prerequisites for building atom-shell on your platform](https://github.com/atom/atom-shell/tree/master/docs#development).
(You don't need to build it manually; grunt will handle that.)

1. Clone this repository
1. `bower install`
1. `cd build`
1. `npm install`
1. `grunt build`

# Usage

## Running the Application

Run `bin/run` (or `bin/run.cmd` on Windows).

## Adding Music

Currently the only way to add music is to drag it from Explorer / Finder / etc. into the grid.

## Keyboard Shortcuts

The following keyboard shortcuts are supported:

* Left Arrow:  Seek left 5 seconds
* Right Arrow:  Seek right 5 seconds
* Space:  Play / Pause
* Escape:  Stop

Additionally, the following keyboard shortcuts are available within the grid:

* Enter:  Play currently-focused track
* Backspace / Delete:  Remove currently-selected track(s)

## License

[MIT](./LICENSE)
