# react-pikaday

A component wrapper around [Pikaday](https://github.com/dbushell/Pikaday).

## Importing

### Normal

If you're using Browserify, or want to bring a custom Pikaday stylesheet, just require this
component like any other module:

```javascript
var Pikaday = require('react-pikaday');
```

### Bundled

If you're using [webpack](http://webpack.github.io/) with a configured
[style-loader](https://github.com/webpack/style-loader) for CSS, you can actually require this
component along with the Pikaday CSS in one go:

```javascript
var Pikaday = require('react-pikaday/bundled');
```

## Usage

```javascript
/** @jsx React.DOM */
var React = require('react');
var Pikaday = require('react-pikaday');

var MyComponent = React.createClass({
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

    return (
      <div>
        <p>
          The date is {date.toDateString()}
        </p>
        <Pikaday value={date} onChange={this.handleChange} />
      </div>
    );
  }
});
```

## Properties

*(todo)*
