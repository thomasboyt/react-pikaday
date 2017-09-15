import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pikaday from 'pikaday';

export default class ReactPikaday extends Component {
  static propTypes = {
    value: PropTypes.instanceOf(Date),
    onChange: PropTypes.func,
    initialOptions: PropTypes.object,
    isStart: PropTypes.bool,
    isEnd: PropTypes.bool,

    valueLink: PropTypes.shape({
      value: PropTypes.instanceOf(Date),
      requestChange: PropTypes.func.isRequired
    })
  };
  static defaultProps = {
    initialOptions: {},
    isStart: false,
    isEnd: false
  };
  constructor(props) {
    super(props);

    this.setDateIfChanged = this.setDateIfChanged.bind(this);
    this.updateStartDate = this.updateStartDate.bind(this);
    this.updateEndDate = this.updateEndDate.bind(this);
    this.getDomProps = this.getDomProps.bind(this);
  }
  getValueLink(props) {
    return props.valueLink || {
      value: props.value,
      requestChange: props.onChange
    };
  }
  setDateIfChanged(newDate, prevDate) {
    var newTime = newDate ? newDate.getTime() : null;
    var prevTime = prevDate ? prevDate.getTime() : null;

    if ( newTime !== prevTime ) {
      if ( newDate === null ) {
        // Workaround for pikaday not clearing value when date set to falsey
        this._input.value = '';
      }
      this._picker.setDate(newDate, true);  // 2nd param = don't call onSelect
    }
  }
  updateStartDate(date, options) {
    this._picker.setStartRange(date);
    if(options.hasOwnProperty('maxDate')) {
      this._picker.setEndRange(options.maxDate);
      this._picker.setMaxDate(options.maxDate);
    }
  }
  updateEndDate(date, options) {
    if(options.hasOwnProperty('minDate')) {
      this._picker.setStartRange(options.minDate);
      this._picker.setMinDate(options.minDate);
    }
    this._picker.setEndRange(date);
  }
  getDomProps() {
    var restProps = {};
    for (var propKey in this.props) {
      if (this.props.hasOwnProperty(propKey) && !ReactPikaday.propTypes[propKey]) {
        restProps[propKey] = this.props[propKey];
      }
    }
    return restProps
  }
  componentDidMount() {
    var el = this._input;

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
  }
  componentWillReceiveProps(nextProps) {
    var newDate = this.getValueLink(nextProps).value;
    var lastDate = this.getValueLink(this.props).value;

    this.setDateIfChanged(newDate, lastDate);

    if(this.props.isStart) {
      this.updateStartDate(newDate, nextProps.initialOptions);
    }
    else if(this.props.isEnd) {
      this.updateEndDate(newDate, nextProps.initialOptions);
    }
  }
  render() {
    return (
      <input type="text" ref={e => this._input = e} {...this.getDomProps()} />
    );
  }
}
