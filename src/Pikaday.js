import React from 'react';
import Pikaday from 'pikaday';

var ReactPikaday = React.createClass({

  propTypes: {
    value: React.PropTypes.instanceOf(Date),
    onChange: React.PropTypes.func,
    initialOptions: React.PropTypes.object,
    isStart: React.PropTypes.bool,
    isEnd: React.PropTypes.bool,

    valueLink: React.PropTypes.shape({
      value: React.PropTypes.instanceOf(Date),
      requestChange: React.PropTypes.func.isRequired
    })
  },

  getDefaultProps: function() {
    return {
      initialOptions: {},
      isStart: false,
      isEnd: false
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

  updateStartDate: function(date, options) {
    this._picker.setStartRange(date);
    if(options.hasOwnProperty('maxDate')) {
      this._picker.setEndRange(options.maxDate);
      this._picker.setMaxDate(options.maxDate);
    }
  },

  updateEndDate: function(date, options) {
    if(options.hasOwnProperty('minDate')) {
      this._picker.setStartRange(options.minDate);
      this._picker.setMinDate(options.minDate);
    }
    this._picker.setEndRange(date);
  },

  // user props to pass down to the underlying DOM node
  getDomProps: function() {
    var restProps = {};
    for (var propKey in this.props) {
      if (this.props.hasOwnProperty(propKey) && !ReactPikaday.propTypes[propKey]) {
        restProps[propKey] = this.props[propKey];
      }
    }
    return restProps
  },

  componentDidMount: function() {
    var el = this.refs.pikaday;

    this._picker = new Pikaday({
      field: el,
      onSelect: this.getValueLink(this.props).requestChange,
      ...this.props.initialOptions
    });

    this.setDateIfChanged(this.getValueLink(this.props).value);

    if(this.props.isStart) {
      this.updateStartDate(this.props.value, this.props.initialOptions);
    }
    else if(this.props.isEnd) {
      this.updateEndDate(this.props.value, this.props.initialOptions);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var newDate = this.getValueLink(nextProps).value;
    var lastDate = this.getValueLink(this.props).value;

    this.setDateIfChanged(newDate, lastDate);

    if(this.props.isStart) {
      this.updateStartDate(newDate, nextProps.initialOptions);
    }
    else if(this.props.isEnd) {
      this.updateEndDate(newDate, nextProps.initialOptions);
    }
  },

  render: function() {
    return (
      <input type="text" ref="pikaday" {...this.getDomProps()} />
    );
  }
});

export default ReactPikaday;
