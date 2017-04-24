import React from 'react';
import createReactClass from 'create-react-class';
import ReactDOM from 'react-dom';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import Pikaday from '../bundled';

var ManualExample = createReactClass({
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
          <Pikaday name="date" value={date} onChange={this.handleChange} />
        </p>
        <button onClick={() => {this.handleChange(null);}}>
          Clear date
        </button>
      </div>
    );
  }
});


var LinkedStateExample = createReactClass({
  mixins: [LinkedStateMixin],

  getInitialState: function() {
    return {
      date: null
    };
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
          <Pikaday valueLink={this.linkState('date')} />
        </p>
        <button onClick={() => { this.setState({date: null}); }}>
          Clear date
        </button>
      </div>
    );
  }
});


var Examples = createReactClass({
  render: function() {
    return (
      <div>
        <h1>Manual Example</h1>
        <ManualExample />
        <h1>LinkedState Example</h1>
        <LinkedStateExample />
      </div>
    );
  }
});

ReactDOM.render(<Examples />, document.getElementById('container'));
