## Changelog

### v0.4.1 (Apr 8 2016)

* Allow React 15.x as a peer dependency

### v0.4.0 (Mar 1, 2016)

* **[Breaking]** react-pikaday now uses ES6 modules through Babel. If you use ES6 modules, you shouldn't have to change anything. If you use CommonJS, you'll now need to import react-pikaday like so:

```js
// before
var Pikaday = require('react-pikaday');

//after
var Pikaday = require('react-pikaday').default;
```

* react-pikaday now uses a peer dependency for React, preventing duplicate copies of React from being installed ([#13](https://github.com/thomasboyt/react-pikaday/issues/13))
* react-pikaday no longer uses the long-deprecated `getDOMNode()` API ([#14](https://github.com/thomasboyt/react-pikaday/issues/14))

### v0.3.1 (Jul 14, 2015)

* The version of `react-pikaday` on NPM is now prebuilt through Babel and no longer requires a build step. Sorry for the delay on this!

### v0.2.0 (Mar 12, 2015)

* **Potentially breaking change** for some: removed the `/** @jsx React.DOM */` pragma, which has been deprecated since React 0.12 and now fails to compile in Babel (thanks @jaseemabid)
* Clear input manually to avoid relying on Pikaday fork (thanks @jgable)
* Add browserify support (thanks @srlindemann)
