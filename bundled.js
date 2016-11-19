// XXX: this doesn't currently get compiled, so keep it es5!

// this only works in webpack, but it's pretty rad:
require('pikaday/css/pikaday.css');

var ReactPikaday = require('./lib/Pikaday');

module.exports = ReactPikaday;
