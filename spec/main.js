/** @jsx React.DOM */

var React = require('react');
var expect = require('chai').expect;

var Pikaday = require('../src/Pikaday');

describe('Pikaday', () => {
  it('renders', () => {
    var component = React.renderComponent(<Pikaday />, document.createElement('div'));
    expect(component).to.be.ok;
  });
});
