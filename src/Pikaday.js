import React from 'react';
import Pikaday from 'pikaday';

var ReactPikaday = React.createClass({

  propTypes: {
    value: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func,
    initialOptions: React.PropTypes.object,

    valueLink: React.PropTypes.shape({
      value: React.PropTypes.instanceOf(Date),
      requestChange: React.PropTypes.func.isRequired
    })
  },

  getDefaultProps: function() {
    return {
      initialOptions: {}
    };
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
      if ( newDate === null ) {
        // Workaround for pikaday not clearing value when date set to falsey
        this.refs.pikaday.value = '';
      }
      this._picker.setDate(newDate, true);  // 2nd param = don't call onSelect
    }
  },

  componentDidMount: function() {
    var el = this.refs.pikaday;

    this._picker = new Pikaday({
      field: el,
      onSelect: this.getValueLink(this.props).requestChange,
      ...this.props.initialOptions
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
        placeholder={this.props.placeholder} disabled={this.props.disabled}
        id={this.props.id} />
    );
  }
});

export default ReactPikaday;
