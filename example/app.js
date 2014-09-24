/** @jsx React.DOM */
var React = require('react');
var Pikaday = require('../bundled');

var App = React.createClass({
  getInitialState: function() {
    return {
      date: null
    };
  },

  handleChange: function(date) {
    this.setState({
      date: date
    });
  },

  render: function() {
    var date = this.state.date;
    var formattedDate = date ? date.toDateString() : 'not set';

    return (
      <div>
        <p>
          The date is {formattedDate}
        </p>
        <p>
          <Pikaday value={date} onChange={this.handleChange} />
        </p>
        <button onClick={() => {this.handleChange(null);}}>
          Clear date
        </button>
      </div>
    );
  }
});

React.renderComponent(<App />, document.getElementById('container'));
