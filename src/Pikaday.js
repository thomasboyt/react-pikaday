/** @jsx React.DOM */

var React = require('react');
var Pikaday = require('pikaday');

var ReactPikaday = React.createClass({

  propTypes: {
    value: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func
  },

  componentDidUpdate: function(prevProps) {
    this.setDateIfChanged(this.props.value, prevProps.value);
  },

  setDateIfChanged: function(newDate, prevDate) {
    prevDate = prevDate ? prevDate.getTime() : null;
    newDate = newDate ? newDate.getTime() : null;

    if ( newDate !== prevDate ) {
      this._picker.setDate(this.props.value, true);  // 2nd param = don't call onSelect
    }
  },

  componentDidMount: function() {
    var el = this.refs.pikaday.getDOMNode();

    this._picker = new Pikaday({
      field: el,
      onSelect: this.props.onChange
    });

    this.setDateIfChanged(this.props.value);
  },

  render: function() {
    return (
      <input type="text" ref="pikaday" className={this.props.className}
        placeholder={this.props.placeholder} />
    );
  }
});

module.exports = ReactPikaday;
