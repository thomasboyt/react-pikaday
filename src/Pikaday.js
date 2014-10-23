/** @jsx React.DOM */

(function (root){
  function build(React, Pikaday){
    var ReactPikaday = React.createClass({

      propTypes: {
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
          field: el,
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
    return ReactPikaday;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = build(require('react'), require('pikaday'));
  } else if (typeof define === 'function' && define.amd) {
    define(['React', 'Pikaday'], build);
  } else {
    root.ReactPikaday = build(root.React, root.Pikaday);
  }
}(this));
