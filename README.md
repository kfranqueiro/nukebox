# Nukebox

Nukebox is a music player built using [Electron](https://github.com/atom/electron/) and
[dgrid](http://dgrid.io/).

![nukebox](./nukebox.png)

# Build Instructions

1. Clone this repository
1. `bower install`
1. `cd build`
1. `npm install`
1. `grunt build`
  * You may need to run this more than once; `grunt-download-electron` seems to sometimes just
    exit immediately without signaling either success or failure on Windows and Linux.

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
