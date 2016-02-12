# Nukebox

Nukebox is a music player built using [Electron](http://electron.atom.io/) and
[dgrid](http://dgrid.io/).

![nukebox](./nukebox.png)

# Build Instructions

## Requirements

You will need `bower` and `grunt-cli` installed globally (i.e. `npm i -g bower grunt-cli`).

## Development

1. Clone this repository
1. `npm install` (which will in turn run `bower install`, then `npm install` inside of `src`)
1. `grunt dev`

## Release

Run `grunt release`

# Usage

## Running the Application

### Development

Run `bin/run` (or `bin\run.cmd` on Windows).

### Release

Run the application for the respective platform under `dist`.
Windows releases contain `Nukebox.exe`, Linux releases contain a `Nukebox` binary, and
the Mac release contains `Nukebox.app`.

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
