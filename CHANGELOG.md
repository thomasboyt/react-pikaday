## Changelog

### v0.3.1 (Jul 14, 2015)

* The version of `react-pikaday` on NPM is now prebuilt through Babel and no longer requires a build step. Sorry for the delay on this!

### v0.2.0 (Mar 12, 2015)

* **Potentially breaking change** for some: removed the `/** @jsx React.DOM */` pragma, which has been deprecated since React 0.12 and now fails to compile in Babel (thanks @jaseemabid)
* Clear input manually to avoid relying on Pikaday fork (thanks @jgable)
* Add browserify support (thanks @srlindemann)
