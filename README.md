# Nukebox

Nukebox is a music player built using [atom-shell](https://github.com/atom/atom-shell/) and
[dgrid](http://dgrid.io/).

# Installation

1. Clone this repository
1. `bower install`
1. `cd build`
1. `npm install`
1. `grunt build`

# Usage

## Running the Application

From the top-level directory of the repository: `bin/run` (or `bin/run.cmd` on Windows)

(Note:  This hasn't yet been tested on Windows or Linux.  This thing's just getting off the ground!)

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

[MIT](http://opensource.org/licenses/MIT)
