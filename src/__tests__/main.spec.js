'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
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
      class Form extends React.Component {
        constructor() {
          super();
          this.state = {
            date: null,
          };
          this.handleChange = this.handleChange.bind(this);
        }

        handleChange(date) {
          this.setState({ date });
        }

        render() {
          return (
            <Pikaday ref="pikaday" value={this.state.date} onChange={this.handleChange} />
          )
        }
      }

      var component = render(<Form />);
      var pikaday = component.refs.pikaday._picker;
      pikaday.setDate(new Date(2014, 0, 1));

      expect(component.state.date).to.be.eql(new Date(2014, 0, 1));
    });

    it('works with two-way binding', function() {
      class Form extends React.Component {
        constructor() {
          super();
          this.state = {
            date: null,
          };
          this.handleChange = this.handleChange.bind(this);
        }

        handleChange(date) {
          this.setState({ date });
        }

        render() {
          const valueLink = {
            value: this.state.date,
            requestChange: this.handleChange,
          };
          return (
            <Pikaday ref="pikaday" valueLink={valueLink} />
          );
        }
      }

      var component = render(<Form />);
      var pikaday = component.refs.pikaday._picker;
      pikaday.setDate(new Date(2014, 0, 1));

      expect(component.state.date).to.be.eql(new Date(2014, 0, 1));
    });

  });

  describe('setting the passed-in value sets the rendered date', () => {

    it('works manually', () => {
      class Form extends React.Component {
        constructor() {
          super();
          this.state = {
            date: new Date(2014, 0, 1),
          };
          this.handleChange = this.handleChange.bind(this);
        }

        handleChange(date) {
          this.setState({ date });
        }

        render() {
          return (
            <Pikaday ref="pikaday" value={this.state.date} onChange={this.handleChange} />
          );
        }
      }

      var component = render(<Form />);

      var input = TU.findRenderedDOMComponentWithTag(component, 'input');
      expect(input.value).to.be.eql('2014-01-01');
    });

    it('works with two-way binding', function() {
      class Form extends React.Component {
        constructor() {
          super();
          this.state = {
            date: new Date(2014, 0, 1),
          };
          this.handleChange = this.handleChange.bind(this);
        }

        handleChange(date) {
          this.setState({ date });
        }

        render() {
          const valueLink = {
            value: this.state.date,
            requestChange: this.handleChange,
          };
          return (
            <Pikaday ref="pikaday" valueLink={valueLink} />
          );
        }
      }

      var component = render(<Form />);

      var input = TU.findRenderedDOMComponentWithTag(component, 'input');
      expect(input.value).to.be.eql('2014-01-01');
    });

  });

  describe('clearing the value', () => {
    it('works with two-way binding', function () {
      class Form extends React.Component {
        constructor() {
          super();
          this.state = {
            date: new Date(2014, 0, 1),
          };
          this.handleChange = this.handleChange.bind(this);
        }

        handleChange(date) {
          this.setState({ date });
        }

        render() {
          const valueLink = {
            value: this.state.date,
            requestChange: this.handleChange,
          };
          return (
            <div>
              <Pikaday ref="pikaday" valueLink={valueLink} />
              <button ref="clearBtn"
                onClick={() => this.setState({ date: null })}>
                Clear
              </button>
            </div>
          );
        }
      }

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
      class Form extends React.Component {
        render() {
          return (
            <Pikaday ref={({ _picker }) => result = _picker._o.minDate } initialOptions={{ minDate }}/>
          );
        }
      }

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
