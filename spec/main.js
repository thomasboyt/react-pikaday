/** @jsx React.DOM */

var React = require('react/addons');
var expect = require('chai').expect;

var Pikaday = require('../src/Pikaday');

var TU = React.addons.TestUtils;

describe('Pikaday', () => {
  it('renders', () => {
    var component = React.renderComponent(<Pikaday />, document.createElement('div'));
    expect(component).to.be.ok;
  });

  describe('updating the date in Pikaday calls handleChange', () => {

    it('works manually', function() {
      var Form = React.createClass({
        getInitialState: function() {
          return { date: null };
        },

        handleChange: function(date) {
          this.setState({ date: date });
        },

        render: function() {
          return (
            <Pikaday ref="pikaday" value={this.state.date} onChange={this.handleChange} />
          );
        }
      });

      var component = React.renderComponent(<Form />, document.createElement('div'));
      var pikaday = component.refs.pikaday._picker;
      pikaday.setDate(new Date(2014, 0, 1));

      expect(component.state.date).to.be.eql(new Date(2014, 0, 1));
    });

    it('works with LinkedStateMixin', function() {
      var Form = React.createClass({
        mixins: [ React.addons.LinkedStateMixin ],

        getInitialState: function() {
          return { date: null };
        },

        render: function() {
          return (
            <Pikaday ref="pikaday" valueLink={this.linkState('date')} />
          );
        }
      });

      var component = React.renderComponent(<Form />, document.createElement('div'));
      var pikaday = component.refs.pikaday._picker;
      pikaday.setDate(new Date(2014, 0, 1));

      expect(component.state.date).to.be.eql(new Date(2014, 0, 1));
    });

  });

  describe('updating the passed-in value updates the rendered date', () => {

    it('works manually', () => {
      var Form = React.createClass({
        getInitialState: function() {
          return { date: new Date(2014, 0, 1) };
        },

        handleChange: function(date) {
          this.setState({ date: date });
        },

        render: function() {
          return (
            <Pikaday ref="pikaday" value={this.state.date} onChange={this.handleChange} />
          );
        }
      });

      var component = React.renderComponent(<Form />, document.createElement('div'));

      var input = TU.findRenderedDOMComponentWithTag(component, 'input').getDOMNode();
      expect(input.value).to.be.eql('2014-01-01');
    });

    it('works with LinkedStateMixin', function() {
      var Form = React.createClass({
        mixins: [ React.addons.LinkedStateMixin ],

        getInitialState: function() {
          return { date: null };
        },

        render: function() {
          return (
            <Pikaday ref="pikaday" valueLink={this.linkState('date')} />
          );
        }
      });

      var component = React.renderComponent(<Form />, document.createElement('div'));

      var input = TU.findRenderedDOMComponentWithTag(component, 'input').getDOMNode();
      expect(input.value).to.be.eql('2014-01-01');
    });

  });
});
