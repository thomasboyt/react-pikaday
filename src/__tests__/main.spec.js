import React from 'react';
import createReactClass from 'create-react-class';
import ReactDOM from 'react-dom';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {expect} from 'chai';
import TU from 'react-addons-test-utils';

import Pikaday from '../Pikaday';

const render = (reactEl) => ReactDOM.render(reactEl, document.createElement('div'));

describe('Pikaday', () => {
  it('renders', () => {
    var component = render(<Pikaday />);
    expect(component).to.be.ok;
  });

  describe('updating the date in Pikaday calls handleChange', () => {

    it('works manually', function() {
      var Form = createReactClass({
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

      var component = render(<Form />);
      var pikaday = component.refs.pikaday._picker;
      pikaday.setDate(new Date(2014, 0, 1));

      expect(component.state.date).to.be.eql(new Date(2014, 0, 1));
    });

    it('works with LinkedStateMixin', function() {
      var Form = createReactClass({
        mixins: [ LinkedStateMixin ],

        getInitialState: function() {
          return { date: null };
        },

        render: function() {
          return (
            <Pikaday ref="pikaday" valueLink={this.linkState('date')} />
          );
        }
      });

      var component = render(<Form />);
      var pikaday = component.refs.pikaday._picker;
      pikaday.setDate(new Date(2014, 0, 1));

      expect(component.state.date).to.be.eql(new Date(2014, 0, 1));
    });

  });

  describe('setting the passed-in value sets the rendered date', () => {

    it('works manually', () => {
      var Form = createReactClass({
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

      var component = render(<Form />);

      var input = TU.findRenderedDOMComponentWithTag(component, 'input');
      expect(input.value).to.be.eql('2014-01-01');
    });

    it('works with LinkedStateMixin', function() {
      var Form = createReactClass({
        mixins: [ LinkedStateMixin ],

        getInitialState: function() {
          return { date: new Date(2014, 0, 1) };
        },

        render: function() {
          return (
            <Pikaday ref="pikaday" valueLink={this.linkState('date')} />
          );
        }
      });

      var component = render(<Form />);

      var input = TU.findRenderedDOMComponentWithTag(component, 'input');
      expect(input.value).to.be.eql('2014-01-01');
    });

  });

  describe('clearing the value', () => {
    it('works with LinkedStateMixin', function () {
      var Form = createReactClass({
        mixins: [ LinkedStateMixin ],

        getInitialState: function() {
          return { date: new Date(2014, 0, 1) };
        },

        render: function() {
          return (
            <div>
              <Pikaday ref="pikaday" valueLink={this.linkState('date')} />
              <button ref="clearBtn"
                onClick={() => this.setState({ date: null })}>
                Clear
              </button>
            </div>
          );
        }
      });

      var component = render(<Form />);

      var input = TU.findRenderedDOMComponentWithTag(component, 'input');
      expect(input.value).to.be.eql('2014-01-01');

      var clearBtn = component.refs.clearBtn;
      TU.Simulate.click(clearBtn);
      expect(input.value).to.be.eql('');
    });
  });

  describe('pikaday options', () => {
    it('passes options to pikaday plugin', function() {
      var minDate = new Date(2014, 0, 1);
      let result;
      var Form = createReactClass({
        render: function() {
          return (
            <Pikaday ref={({ _picker }) => result = _picker._o.minDate } initialOptions={{ minDate }}/>
          );
        }
      });

      TU.renderIntoDocument(<Form />);

      expect(result).to.eql(minDate);
    });
  });

  it('passes arbitrary, unexpected props to the input node', () => {
    var component = render(<Pikaday name="foo" initialOptions={{foo: 'bar'}} />);
    var input = TU.findRenderedDOMComponentWithTag(component, 'input');

    expect(input.initialOptions).to.be.undefined
    expect(input.name).to.eql('foo')
  });
});
