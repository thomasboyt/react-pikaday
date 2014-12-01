/** @jsx React.DOM */

var React = require('react');
var Pikaday = require('pikaday');

var ReactPikaday = React.createClass({

  propTypes: {
    defaultDate: React.PropTypes.object,  // date object
    firstDay: React.PropTypes.number,     // 0-6 for day of week
    format: React.PropTypes.string,       // A date format. see http://momentjs.com/docs/#/parsing/string-format/
    maxDate: React.PropTypes.object,      // date object
    minDate: React.PropTypes.object,      // date object
    position: React.PropTypes.string,     // one or combination of "top left bottom right"
    setDefaultDate: React.PropTypes.bool, // make the `defaultDate` the initial selected value
    showWeekNumber: React.PropTypes.bool,
    value: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func,
    valueLink: React.PropTypes.shape({
      value: React.PropTypes.instanceOf(Date),
      requestChange: React.PropTypes.func.isRequired
    })
  },

  getValueLink: function(props) {
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange
    };
  },

  setDateIfChanged: function(newDate, prevDate) {
    var newTime = newDate ? newDate.getTime() : null;
    var prevTime = prevDate ? prevDate.getTime() : null;

    if ( newTime !== prevTime ) {
      this._picker.setDate(newDate, true);  // 2nd param = don't call onSelect
    }
  },

  componentDidMount: function() {
    var el = this.refs.pikaday.getDOMNode();

    this._picker = new Pikaday({
      defaultDate: this.props.defaultDate ? this.props.defaultDate : new Date(),
      field: el,
      firstDay: this.props.firstDay ? this.props.firstDay : 0,
      format: this.props.format ? this.props.format : 'YYYY-MM-DD',
      maxDate: this.props.maxDate,
      minDate: this.props.minDate,
      position: this.props.position ? this.props.position : "bottom left",
      setDefaultDate: this.props.setDefaultDate ? this.props.setDefaultDate : false,
      showWeekNumber: this.props.showWeekNumber,
      onSelect: this.getValueLink(this.props).requestChange
    });

    this.setDateIfChanged(this.getValueLink(this.props).value);
  },

  componentWillReceiveProps: function(nextProps) {
    var newDate = this.getValueLink(nextProps).value;
    var lastDate = this.getValueLink(this.props).value;

    this.setDateIfChanged(newDate, lastDate);
  },

  render: function() {
    return (
      <input type="text" ref="pikaday" className={this.props.className}
        placeholder={this.props.placeholder} />
    );
  }
});

module.exports = ReactPikaday;
